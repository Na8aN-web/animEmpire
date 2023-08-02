import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { AiFillStar } from "react-icons/ai";
import Loader from "./Loader";
import axios from "axios";
import Link from "next/link";

const AnimeCarousel = () => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [isCarouselReady, setIsCarouselReady] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/seasons/now")
      .then((response) => {
        const shuffledAnime = shuffleArray(response.data.data);
        setTrendingAnime(shuffledAnime);
        setIsLoading(false);
        setIsCarouselReady(true); // Set the carousel as ready
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (trendingAnime.length > 0) {
      // If the trendingAnime array has data, update the background image URL
      setBackgroundImageUrl(
        trendingAnime[activeSlideIndex].images.jpg.large_image_url
      );
    }
  }, [activeSlideIndex, trendingAnime]);

  const handleCarouselChange = (index) => {
    setActiveSlideIndex(index);
  };

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  if (isLoading){
    return <Loader />
  }

  return (
    <div className="relative mt-12 ">
      <div className="flex flex-col md:flex-row">
        {/* Carousel */}
        <div className="w-full md:w-1/2">
          {isCarouselReady && ( // Check if the carousel is ready
            <Carousel
              showArrows={true}
              autoPlay={true}
              interval={5000}
              centerMode={false}
              infiniteLoop={true}
              showStatus={false}
              showThumbs={false} // Disable thumbs to prevent thumbnail issues
              dynamicHeight={true}
              onChange={handleCarouselChange}
            >
              {trendingAnime.map((anime) => (
                <div key={anime.id} className="w-full relative">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="h-96 md:h-screen w-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>

        {/* Text Container */}
        <div className="w-full md:w-1/2 md:h-screen h-96 bg-black bg-opacity-80 text-white p-6 md:p-16 overflow-scroll custom-scrollbar">
          {trendingAnime && trendingAnime[activeSlideIndex] && (
            <div className="">
              <h1 className="text-white text-[20px] md:text-[40px] font-bold mb-4 flex justify-start w-full neon-glow font-mont">
                Ongoing titles
              </h1>
              <h1 className="text-white text-[20px] md:text-[40px] mb-4 flex justify-start w-full neon-glow font-mont">
                {trendingAnime[activeSlideIndex].title_english
                  ? `${trendingAnime[activeSlideIndex].title_japanese} (${trendingAnime[activeSlideIndex].title_english})`
                  : trendingAnime[activeSlideIndex].title}
              </h1>
              <h1 className="font-mont leading-7 text-[13px] md:text-[16px]">
                {trendingAnime[activeSlideIndex].synopsis}
              </h1>
              <div className="flex flex-col gap-4 mt-8">
                <p className="flex items-center gap-2 font-mont text-[13px] md:text-[16px]">
                  <strong>Episode Count:</strong>{" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {trendingAnime[activeSlideIndex].episodes} Episode(s)
                  </span>
                </p>
                <p className="flex items-center gap-2 font-mont text-[13px] md:text-[16px]">
                  {" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {trendingAnime[activeSlideIndex].status}
                  </span>{" "}
                </p>
                <p className="flex items-center gap-2 font-mont text-[13px] md:text-[16px]">
                  {" "}
                  <AiFillStar size={24} color="gold" />
                  {trendingAnime[activeSlideIndex].score}
                </p>
                <p className="flex items-center gap-2 font-mont text-[13px] md:text-[16px]">
                  {" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {trendingAnime[activeSlideIndex].rating}
                  </span>{" "}
                </p>
                <p className="flex items-center gap-2 font-mont text-[13px] md:text-[16px]">
                  <strong>Duration:</strong>{" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {trendingAnime[activeSlideIndex].duration}
                  </span>
                </p>
                <p className="flex items-center gap-2 font-mont text-[13px] md:text-[16px]">
                  <strong>Type:</strong>{" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {trendingAnime[activeSlideIndex].type}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 text-[13px] md:text-[16px]">
                  <strong>Studios:</strong>{" "}
                  {trendingAnime[activeSlideIndex].studios.map((studio) => {
                    return (
                      <div>
                        <span className="font-mont border border-gray-500 px-2 py-1 rounded">
                          {studio.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2 text-[13px] md:text-[16px]">
                  <strong>Genres:</strong>{" "}
                  {trendingAnime[activeSlideIndex].genres.map((genre) => {
                    return (
                      <div>
                        <span className="font-mont border border-gray-500 px-2 py-1 rounded">
                          {genre.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Link target={"_blank"} href={trendingAnime[activeSlideIndex].url}>
                <button
                  type="button"
                  className=" text-[13px] md:text-[20px] my-8 px-4 py-2 font-mont bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 hover:bg-gradient-to-r hover:text-white rounded-md transition-all duration-300 text-white"
                >
                  More Details
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Mirrored Background Image */}
      {backgroundImageUrl && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            opacity: 0.2,
            transform: "scaleX(-1)",
            zIndex: -1,
            transition: "opacity 0.5s ease",
          }}
        />
      )}
    </div>
  );
};

export default AnimeCarousel;
