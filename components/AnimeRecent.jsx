import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "./Loader";
import PaginationCircle from "./PaginationCircle";

const AnimeRecent = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [fade, setFade] = useState(false);

  const router = useRouter();
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/watch/episodes")
      .then((response) => {
        setAnimeList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />
  }

  if (animeList.length === 0) {
    return <div>No recent anime found.</div>;
  }

  const { data } = animeList;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setFade(true); // Set fade to true to trigger the fade-out effect
      setTimeout(() => {
        setCurrentPage(pageNumber); // Update the current page after a brief delay
      }, 300);
      setTimeout(() => {
        setFade(false); // Set fade back to false to trigger the fade-in effect
      }, 400); // Adjust the delay to be slightly longer than the fade-out transition
    }
  };
  const handleAnimeClick = (animeId) => {
    // Redirect to the anime details page for the selected anime
    router.push(`/anime/${animeId}`);
  };
  console.log(animeList)

  // Calculate the indexes of the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8 justify-center">
      <h2 className="text-white text-[20px] md:text-[40px] font-bold mb-4 flex justify-start w-full px-6 py-12 neon-glow font-mont">
        Latest Updates
      </h2>
      <div className="flex flex-wrap justify-evenly gap-2 md:gap-4">
        {currentItems.map((anime) => (
          <div
            key={anime.entry.mal_id}
            className={`text-white w-32  md:w-[200px] transition-opacity hover:opacity-50 ${
              fade ? "opacity-0" : "opacity-100" // Toggle the opacity based on the fade state
            }`}
            onClick={() => handleAnimeClick(anime.entry.mal_id)}
          >
            <img
              src={anime.entry.images.jpg.image_url}
              alt={anime.entry.title}
              className="rounded-lg"
            />
            <h3 className="text-[13px] md:text-xl mt-2 w-full font-mont">
              {anime.entry.title}
            </h3>
            <div className="w-full p-2 text-[12px] bg-gray-100 text-black font-mont mb-8 mt-2 rounded-2xl">
              {anime.episodes[0].title}
            </div>
          </div>
        ))}
      </div>
      <PaginationCircle
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default AnimeRecent;
