import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query; // Fetch the search query from the router

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = (query) => {
    // Use the Jikan API to search for anime by name using the query parameter
    axios
      .get(`https://api.jikan.moe/v4/anime?q=${query}`)
      .then((response) => {
        setSearchResults(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  };

  const handleAnimeClick = (animeId) => {
    // Redirect to the anime details page for the selected anime
    router.push(`/anime/${animeId}`);
  };

  if (loading){
    return <Loader />
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col py-12 items-center justify-center">
        <h2 className="text-white text-[20px] md:text-3xl font-bold mb-4 flex justify-start w-full px-6 py-12 neon-glow font-mont">
          Search Results for "{query}"
        </h2>
        <div className="anime-list flex flex-wrap justify-evenly gap-4 mt-4">
          {loading ? (
            <div className="text-white max-w-[200px] animate-pulse">
              <div className="w-full h-32 bg-gray-700 rounded-lg"></div>
              <div className="mt-2 w-3/4 h-4 bg-gray-700 rounded"></div>
            </div>
          ) : (
            searchResults.map((anime) => (
              <div
                key={anime.mal_id}
                className="text-white w-32 md:w-[200px] hover:opacity-50"
                onClick={() => handleAnimeClick(anime.mal_id)}
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="rounded-lg"
                />
                <h3 className="text-[13px] md:text-xl mt-2 w-full font-mont">
                  {anime.title}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
