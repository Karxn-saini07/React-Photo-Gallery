import { useState, useReducer, useCallback, useMemo, useEffect } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouriteReducer } from "../reducer/favouriteReducer";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouriteReducer,
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  const toggleFavourite = (photo) => {
    dispatch({
      type: "TOGGLE_FAV",
      payload: photo,
    });
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading photos...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Search Input */}
      <input
  type="text"
  placeholder="Search by author..."
  onChange={handleSearch}
  className="w-full mb-8 p-4 text-lg border rounded-xl shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
/>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {filteredPhotos.map((photo) => {
          const isFav = favourites.find((f) => f.id === photo.id);

          return (
            <div
                key={photo.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
                >
              <img
                src={photo.download_url}
                alt={photo.author}
                className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                />

              <div className="flex justify-between items-center p-3">
                <p className="text-sm font-medium">{photo.author}</p>

                <button
                  onClick={() => toggleFavourite(photo)}
                  className="text-2xl hover:scale-125 transition"
                >
                  {isFav ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}