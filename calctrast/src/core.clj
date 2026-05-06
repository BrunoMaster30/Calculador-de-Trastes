(ns core
  (:require
    [ring.adapter.jetty :as jetty]
    [routes :refer [app]]))

(defn -main []
  (jetty/run-jetty app {:port 3000 :join? false}))