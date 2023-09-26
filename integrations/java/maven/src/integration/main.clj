(ns integration.main
  (:gen-class)
  (:import (java.io File FileReader)
           (org.apache.maven.model.io.xpp3 MavenXpp3Reader)))

(def elements     (atom #{}))
(def dependencies (atom #{}))
(def cotainments  (atom #{}))

(defn- model-info->path [{:keys [artifact-id group-id]}]
  (str group-id "/" artifact-id))

(defn- create-element [element-info]
  (swap! elements conj {:path (model-info->path element-info)
                        :type ""
                        :technology "java"}))

(defn- create-dependency-if-necessary [from-element-info dependencies-info]
  (when (seq dependencies-info)
    (swap! dependencies conj {:from (model-info->path from-element-info)
                              :dependencies (map (fn [dependency-info]
                                                   {:to (model-info->path dependency-info)})
                                                 dependencies-info)})))

(defn- create-cotainment [container-info contents-info]
  (swap! cotainments conj {:container (model-info->path container-info)
                           :contents  (map (fn [content-info]
                                             (model-info->path content-info))
                                           contents-info)}))

(defn- get-model-info [model]
  {:artifact-id (.getArtifactId model)
   :group-id    (.getGroupId    model)
   :version     (.getVersion    model)})

(defn- get-dependencies-info [model]
  (map get-model-info (.getDependencies model)))

(defn- navigate-modules [pom-path]
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
            (create-dependency-if-necessary model-info deps-info)
            (prn @elements)
            (prn @dependencies)
            (let [modules (.getModules model)]
              (when (and modules (not (.isEmpty modules)))
                #_(println "Modules:")
                (run! 
                 (fn [module-name]
                   (println "-" module-name)
                   ;; Construct the path to the module's POM file
                   (let [module-dir (File. (.getParent pom-file) module-name)
                         module-pom (File. module-dir "pom.xml")]
                     ;; Navigate to this module recursively
                     (navigate-modules (.getAbsolutePath module-pom))))
                 modules))))
          (catch Exception e
            (.printStackTrace e)))))))

(defn -main [pom-path]
  (navigate-modules pom-path))
