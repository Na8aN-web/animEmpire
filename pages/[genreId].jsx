import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";

const GenreAnimeList = () => {
  const router = useRouter();
  const { genreId } = router.query;
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreName, setGenreName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fade, setFade] = useState(false); // State to handle fade-out and fade-in effect

  useEffect(() => {
    if (genreId) {
      fetchAnimeByGenre(genreId, currentPage);
    }
  }, [genreId, currentPage]);

  const fetchAnimeByGenre = (genreId, page) => {
    axios
      .get("https://api.jikan.moe/v4/genres/anime")
      .then((response) => {
        const genre = response.data.data.find(
          (genre) => genre.mal_id === Number(genreId)
        );
        if (genre) {
          setGenreName(genre.name);
          axios
            .get(`https://api.jikan.moe/v4/anime?page=${page}`)
            .then((animeResponse) => {
              const animeData = animeResponse.data.data;
              const animeByGenre = animeData.filter((anime) =>
                anime.genres.some(
                  (animeGenre) => animeGenre.name === genre.name
                )
              );
              setAnimeList(animeByGenre); // Update the animeList state with the fetched anime titles
              setLoading(false);
              setFade(false); // Ensure fade is reset to false when new data is loaded
            })
            .catch((error) => {
              console.error("Error fetching anime by genre:", error);
              setLoading(false);
              setFade(false); // Ensure fade is reset to false on error
            });
        } else {
          console.error("Genre not found.");
          setLoading(false);
          setFade(false); // Ensure fade is reset to false on error
        }
      })
      .catch((error) => {
        console.error("Error fetching genre:", error);
        setLoading(false);
        setFade(false); // Ensure fade is reset to false on error
      });
  };
  const handleAnimeClick = (animeId) => {
    // Redirect to the anime details page for the selected anime
    router.push(`/anime/${animeId}`);
  };

  const handleLoadMore = () => {
    setFade(true); // Set fade to true to trigger the fade-out effect
    setCurrentPage((nextPage) => nextPage + 1); // Update the current page
  };

  const handleLoadPrev = () => {
    setFade(true); // Set fade to true to trigger the fade-out effect
    setCurrentPage((prevPage) => prevPage - 1); // Update the current page
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start w-full py-12">
        <h2 className="text-white text-[20px] md:text-3xl font-bold mb-4 flex justify-start w-full px-6 py-12 neon-glow font-mont">
          {genreName} Anime
        </h2>
        <div className=" w-full flex flex-wrap justify-between gap-2 md:gap-4 px-6 py-12">
          {loading ? (
            <div className="text-white max-w-[200px] animate-pulse">
              <div className="w-full h-32 bg-gray-700 rounded-lg"></div>
              <div className="mt-2 w-3/4 h-4 bg-gray-700 rounded"></div>
            </div>
          ) : (
            animeList.map((anime, index) => (
              <div
                key={anime.mal_id}
                className={`text-white w-32 md:w-[200px] hover:opacity-50 ${
                  fade ? "opacity-0" : "opacity-100" // Toggle the opacity based on the fade state
                } transition-opacity`}
                onClick={() => handleAnimeClick(anime.mal_id)}
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="rounded-lg"
                />
                <h3 className="text-[13px] md:text-xl mt-2 w-full font-mont">{anime.title}</h3>
              </div>
            ))
          )}
        </div>
        {!loading && (
          <div className="flex gap-4">
            <button
              onClick={handleLoadPrev}
              disabled={currentPage === 1}
              className="mr-8 font-mont w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 hover:bg-gradient-to-r hover:text-white transition-all duration-300  rounded-full flex items-center justify-center text-white font-bold"
            >
              Prev
            </button>
            <button
              onClick={handleLoadMore}
              disabled={currentPage === animeList.length}
              className=" font-mont w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 hover:bg-gradient-to-r hover:text-white rounded-full transition-all duration-300  flex items-center justify-center ml-8 text-white font-bold"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GenreAnimeList;
