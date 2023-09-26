(ns integration.main
  (:gen-class)
  (:import (java.io File FileReader)
           (org.apache.maven.model.io.xpp3 MavenXpp3Reader)))

(defn- get-model-info [model]
  {:artifact-id (.getArtifactId model)
   :group-id    (.getGroupId    model)
   :version     (.getVersion    model)})

(defn- get-dependencies [model]
  (map get-model-info (.getDependencies model)))

(defn- navigate-modules [pom-path]
  (let [pom-file (File. pom-path)]
    (if (not (.exists pom-file))
      (println "POM file does not exist:" pom-path)
      (let [reader (MavenXpp3Reader.)]
        (try
          (let [file-reader (FileReader. pom-file)
                model (.read reader file-reader)
                model-info (-> model
                               get-model-info
                               (assoc :dependencies (get-dependencies model)))]
            (println "Current POM:")
            (println model-info)
            (let [modules (.getModules model)]
              (when (and modules
                         (not (.isEmpty modules)))
                (println "Modules:")
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
