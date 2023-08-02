import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PaginationCircle from "./PaginationCircle";
import Loader from "./Loader";

const AnimeUpcoming = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/seasons/upcoming")
      .then((response) => {
        setAnimeList(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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
  // Calculate the total number of pages based on the animeList length and items per page
  const totalPages = Math.ceil(animeList.length / itemsPerPage);

  const handleAnimeClick = (animeId) => {
    // Redirect to the anime details page for the selected anime
    router.push(`/anime/${animeId}`);
  };

  // Calculate the indexes of the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = animeList.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8 justify-center">
        <h2 className="text-white text-[20px] md:text-[40px] font-bold mb-4 flex justify-start w-full px-6 py-12 neon-glow font-mont">
          Upcoming Titles
        </h2>
        <div className="anime-list flex flex-wrap justify-evenly gap-2 md:gap-4 mt-4">
          {currentItems.map((anime) => (
            <div
              key={anime.mal_id}
              className={`text-white w-32 md:w-[200px] transition-opacity hover:opacity-50 ${
                fade ? "opacity-0" : "opacity-100" // Toggle the opacity based on the fade state
              }`}
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
          ))}
        </div>
        <PaginationCircle
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AnimeUpcoming;
