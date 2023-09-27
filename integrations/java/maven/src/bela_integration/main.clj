(ns bela-integration.main
  (:gen-class)
  (:import (java.io File FileReader)
           (org.apache.maven.model.io.xpp3 MavenXpp3Reader)))

(def maven-group "maven-group")

;; TODO: set as env var: bela-host, bela-token. set as str args: source, path-to-pom
;; TODO: export exceptions to BELA or create missing elements
(defn- project-info->path [{:keys [artifact-id group-id type]}]
  (cond-> 
   (str type "/" group-id)
   artifact-id (str ":" artifact-id)))

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
   (update-in arch [:container->contents container] (fnil #{} conj) content)))

(defn- project-info->group-info [project-info]
  {:type     maven-group
   :group-id (:group-id project-info)})

(defn- add-group-and-project [arch project-info]
  (let [group-info (project-info->group-info project-info)]
    (-> arch
        (add-element group-info)
        (add-element project-info)
        (add-containment group-info project-info))))

(defn- add-entities [arch parent-info project-info deps-info]
  (let [arch (add-group-and-project arch project-info)])
  (when (seq deps-info)
    (run! add-group-and-project deps-info)
    (add-dependencies arch project-info deps-info))
  (when (seq parent-info)
    (add-containment arch parent-info project-info)))

(defn- get-project-info [model]
  {:artifact-id (.getArtifactId model)
   :group-id    (.getGroupId    model)
   :version     (.getVersion    model)
   :type        "maven-project"})

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

(defn- upsert-elements' []
  (map #(assoc % :op "upsert-element")  @elements))

(defn- add-dependencies' []
  (map #(assoc % :op "add-dependencies") @dependencies))

(defn- remove-group-containment-if-necessary [container->contents]
  (prn "@@@@ container->contents" container->contents)
  (let [all-contained-elements (->> container->contents
                                    (remove (fn [[k _v]]
                                              (.startsWith k maven-group)))
                                    (into {})
                                    vals
                                    (apply concat))]
    (prn "@@@ all-contained-elements" all-contained-elements)
    (reduce (fn [container->contents contained-element]
              (update container->contents :bla disj contained-element))
            container->contents
            all-contained-elements)))

(defn- add-containments' []
  (->> @container->contents
       remove-group-containment-if-necessary
       (map (fn [[k v]]
              {:op "add-containments"
               :container k
               :contents  v}))))

(defn- patch-architecure [source architecture]
  (let [operations (concat (upsert-elements)
                           (add-dependencies)
                           (add-containments))
        payload    {:source      source
                    :transaction operations}]
    payload))

(defn -main [pom-path]
  (->>
   (extract-arch pom-path nil {:elements #{}
                               :dependencies #{}
                               :container->contents {}})
   (patch-architecure "source")))
