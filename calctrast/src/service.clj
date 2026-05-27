(ns service)

(defn fret-position [scale n]
  (* scale (- 1 (/ 1 (Math/pow 2 (/ n 12.0))))))

(defn calculate [scale frets]
  (map #(fret-position scale %) (range 1 (inc frets))))