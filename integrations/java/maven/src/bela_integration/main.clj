(ns bela-integration.main
  (:gen-class)
  (:import (java.io File FileReader)
           (org.apache.maven.model.io.xpp3 MavenXpp3Reader)))

(def elements     (atom #{}))
(def dependencies (atom #{}))
(def container->contents (atom {}))

;; TODO: Create element that represents the group-id (it will have the "maven-group" type)
;; TODO: set as env var: bela-host, bela-token. set as str args: source, path-to-pom
(defn- model-info->path [{:keys [artifact-id group-id]}]
  (str "maven/" group-id "/" artifact-id))

(defn- create-element [element-info]
  (swap! elements conj {:path (model-info->path element-info)
                        :type ""
                        :technology "java"}))

(defn- create-dependency [from-element-info dependencies-info]
  (swap! dependencies conj {:from (model-info->path from-element-info)
                            :dependencies (map (fn [dependency-info]
                                                 {:to (model-info->path dependency-info)})
                                               dependencies-info)}))

(defn- add-containment [container->contents {:keys [container content]}]
  (update container->contents container (fnil conj #{}) content))

(defn- create-containment [container-info content-info]
  (swap! container->contents add-containment {:container (model-info->path container-info)
                                              :content   (model-info->path content-info)}))

(defn- get-model-info [model]
  {:artifact-id (.getArtifactId model)
   :group-id    (.getGroupId    model)
   :version     (.getVersion    model)})

(defn- get-dependencies-info [model]
  (map get-model-info (.getDependencies model)))

(defn- navigate-modules [pom-path parent-model-info]
  (let [pom-file (File. pom-path)]
    (if (not (.exists pom-file))
      (println "POM file does not exist:" pom-path)
      (let [reader (MavenXpp3Reader.)]
        (try
          (let [file-reader (FileReader. pom-file)
                model (.read reader file-reader)
                model-info (get-model-info model)
                deps-info  (get-dependencies-info model)]
            (create-element model-info)
            (when (seq deps-info)
              (create-dependency model-info deps-info))
            (when (seq parent-model-info)
              (create-containment parent-model-info model-info))
            (let [modules (.getModules model)]
              (when (and modules (not (.isEmpty modules)))
                (run!
                 (fn [module-name]
                   (let [module-dir (File. (.getParent pom-file) module-name)
                         module-pom (File. module-dir "pom.xml")]
                     (navigate-modules (.getAbsolutePath module-pom) model-info)))
                 modules))))
          (catch Exception e
            (.printStackTrace e)))))))

(defn -main [pom-path]
  (navigate-modules pom-path nil))
