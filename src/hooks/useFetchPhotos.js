import { useState, useEffect } from "react";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?limit=30")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch photos");
        setLoading(false);
      });
  }, []);

  return { photos, loading, error };
}