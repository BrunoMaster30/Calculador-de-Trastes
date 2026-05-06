(ns routes
  (:require
    [reitit.ring :as ring]
    [reitit.ring.middleware.parameters :as parameters]
    [muuntaja.middleware :as middleware]
    [service :as s]))

(defn handler-post [req]
  (let [{:keys [scale frets]} (:body-params req)]
    {:status 200
     :body {:positions (vec (s/calculate scale frets))}}))

(defn handler-get [req]
  (let [{:strs [scale frets]} (:query-params req)]
    (if (and scale frets)
      (let [scale (Double/parseDouble scale)
            frets (Integer/parseInt frets)]
        {:status 200
         :body {:positions (vec (s/calculate scale frets))}})
      {:status 400
       :body {:error "Passe scale e frets na URL"}})))

(def app
  (ring/ring-handler
    (ring/router
      [["/"
        {:get (fn [_]
                {:status 200
                 :body "API rodando"})}]

       ["/calculate"
        {:get handler-get
         :post handler-post}]]

      {:data {:middleware [parameters/parameters-middleware
                           middleware/wrap-format]}})))