(ns bela-integration.api-interaction
  (:require [org.httpkit.client :as http]))

(def server-host (System/getenv "BELA_HOST"))
(def auth-token  (System/getenv "BELA_TOKEN"))

(defn throw-treated [err-msg]
  {:status 400
   :body {:error err-msg}})

(defn- check-response [{:keys [error status]}]
  (when error
    (throw-treated (str "Failed uploading architecture: " (.getMessage error))))
  (when-not (<= 200 status 202)
    (throw-treated (str "Failed uploading architecture: Status - " status))))

(defn upload-architecture [payload]
  (let [url (str server-host "architecture")
        response @(http/patch url {:body    payload
                                   :headers {"Authorization" (str "Bearer " auth-token)}})]
    (check-response response)
    {:status 200}))
