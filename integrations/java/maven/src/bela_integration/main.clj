(ns bela-integration.main
  (:gen-class)
  (:require [bela-integration.api-interaction :refer [upload-architecture]])
  (:import (java.io File FileReader)
           (org.apache.maven.model.io.xpp3 MavenXpp3Reader)))

;; TODO: export exceptions to BELA or create missing elements
(defn- project-info->path [{:keys [artifact-id group-id]}]
  (str "maven-project/" group-id ":" artifact-id))

(defn- add-element [arch project-info]
  (update arch :elements conj {:path (project-info->path project-info)
                               :technology "java"}))

(defn- add-dependencies [arch project-info deps-info]
  (update arch :dependencies conj {:from (project-info->path project-info)
                                   :dependencies (map (fn [dependency-info]
                                                        {:to (project-info->path dependency-info)})
                                                      deps-info)}))

(defn- add-containment [arch container-info content-info]
  (let [container (project-info->path container-info)
        content   (project-info->path content-info)]
   (update-in arch [:container->contents container] (fnil conj #{}) content)))

(defn- add-entities [arch parent-info project-info deps-info]
  (let [arch (reduce add-element arch (conj deps-info project-info))]
    (cond-> arch
      (seq deps-info)   (add-dependencies project-info deps-info)
      (seq parent-info) (add-containment parent-info project-info))))

(defn- get-project-info [model]
  {:artifact-id (.getArtifactId model)
   :group-id    (.getGroupId    model)
   :version     (.getVersion    model)})

(defn- get-dependencies-info [model]
  (map get-project-info (.getDependencies model)))

(defn- extract-arch [pom-path parent-info arch]
  (let [pom-file (File. pom-path)]
    (if (not (.exists pom-file))
      (println "POM file does not exist:" pom-path)
      (let [reader (MavenXpp3Reader.)]
        (try
          (let [file-reader (FileReader. pom-file)
                model (.read reader file-reader)
                project-info (get-project-info model)
                deps-info (get-dependencies-info model)
                arch (add-entities arch parent-info project-info deps-info)]
            (reduce (fn [arch module-name]
                      (let [module-dir (File. (.getParent pom-file) module-name)
                            module-pom (File. module-dir "pom.xml")]
                        (extract-arch (.getAbsolutePath module-pom) project-info arch)))
                    arch
                    (.getModules model)))
          (catch Exception e 
            (.printStackTrace e)))))))

(defn- upsert-elements' [arch]
  (map #(assoc % :op "upsert-element")   (:elements arch)))

(defn- add-dependencies' [arch]
  (map #(assoc % :op "add-dependencies") (:dependencies arch)))

(defn- add-containments' [arch]
  (map (fn [[k v]]
         {:op "add-containments"
          :container k
          :contents  v}) (:container->contents arch)))

(defn- patch-architecure [source arch]
  (let [operations (concat (upsert-elements'  arch)
                           (add-dependencies' arch)
                           (add-containments' arch))
        payload    {:source      source
                    :transaction operations}]
    (upload-architecture payload)))

(defn -main [pom-path source]
  (->>
   (extract-arch pom-path nil {:elements #{}
                               :dependencies #{}
                               :container->contents {}})
   (patch-architecure source)))
