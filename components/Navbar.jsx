import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [logoText, setLogoText] = useState("animEmpire");
  const router = useRouter();

  useEffect(() => {
    // Add event listener to close the dropdown when user clicks outside
    const handleOutsideClick = (event) => {
      if (searchQuery.length > 0) {
        const dropdown = document.getElementById("search-dropdown");
        if (dropdown && !dropdown.contains(event.target)) {
          setSearchQuery("");
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 300) {
        setLogoText("aE");
      } else {
        setLogoText("animEmpire");
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Initial check on component mount
    handleWindowResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Perform search and fetch data from the Jikan API
    fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      });
  };

  const handleSearchButtonClick = () => {
    // Redirect to the search results page with the searchQuery as a query parameter
    router.push(`/SearchResults?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };
  const handleAnimeClick = (animeId) => {
    // Redirect to the anime details page for the selected anime
    setSearchQuery("");
    router.push(`/anime/${animeId}`);
  };
  return (
    <>
      <nav className="flex justify-between items-center bg-gray-900 text-white p-4 fixed z-50 left-0 right-0 top-0">
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={handleToggleSidebar}
        >
          ☰
        </button>
        <div className="text-[16px] md:text-4xl font-bold text-white neon-glow font-mont">
          <Link href={"/"}>{logoText}</Link>
        </div>
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-24 md:w-72 text-[12px] md:text-[16px] px-4 py-2 mr-2 border border-gray-500 rounded-lg font-mont text-black focus:outline-none"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            type="button"
            className=" text-[12px] md:text-[16px] px-4 md:py-3 py-2 font-mont bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 hover:bg-gradient-to-r hover:text-white rounded-md transition-all duration-300 text-white"
            onClick={handleSearchButtonClick}
          >
            <BsSearch size={16} color="white" />
          </button>
          {/* Dropdown to show similar anime as the user types */}
          {searchQuery.length > 0 && (
            <div
              id="search-dropdown"
              className="absolute top-10 mt-1 p-2 bg-gray-900 border border-gray-300 rounded-lg w-full max-h-40 overflow-y-auto shadow-lg"
            >
              {searchResults.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="cursor-pointer hover:bg-gray-700 flex items-center gap-2 p-2"
                  onClick={() => handleAnimeClick(anime.mal_id)}
                >
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-10 h-10"
                  />
                  <div className="font-mont text-white md:text-[13px] text-[10px] w-full h-full">
                    {anime.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
      {showSidebar && <Sidebar onCloseSidebar={handleCloseSidebar} />}
    </>
  );
};

export default Navbar;
