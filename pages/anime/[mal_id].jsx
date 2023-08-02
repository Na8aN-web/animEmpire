import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import Loader from "@/components/Loader";

const AnimeDetails = () => {
  const router = useRouter();
  const { mal_id } = router.query;

  const [animeDetails, setAnimeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mal_id) {
      setTimeout(() => {
        fetchAnimeDetails(mal_id);
      }, 1000); // 1-second delay before fetching the anime details
    }
  }, [mal_id]);

  const fetchAnimeDetails = (mal_id) => {
    // Use the Jikan API to fetch details of the anime using the mal_id
    axios
      .get(`https://api.jikan.moe/v4/anime/${mal_id}`)
      .then((response) => {
        setAnimeDetails(response.data.data || null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime details:", error);
        setAnimeDetails(null);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  // Destructure the anime details to display relevant information
  const {
    title_japanese,
    title_english,
    synopsis,
    episodes,
    score,
    images,
    duration,
    genres,
    rating,
    status,
    studios,
    type,
    url
  } = animeDetails;
  console.log(animeDetails);
  return (
    <Layout>
      <div className="relative mt-12">
        <div className="flex flex-col md:flex-row">
          {/* image */}
          <div className="w-full md:w-1/2">
            <img
              src={images.jpg.large_image_url}
              alt={title_japanese}
              className="w-full md:h-screen h-96"
            />
          </div>

          {/* Text Container */}
          <div className="w-full md:w-1/2 md:h-screen h-96 bg-black bg-opacity-80 text-white p-6 md:p-16 overflow-y-scroll custom-scrollbar">
            <div className="">
              <h1 className="text-white text-[20px] md:text-[40px] mb-4 flex justify-start w-full neon-glow font-mont">
                {title_japanese}({title_english})
              </h1>
              <h1 className="font-mont leading-7 text-[13px] md:text-[16px]">{synopsis}</h1>
              <div className="flex flex-col gap-4 mt-8 text-[13px] md:text-[16px]">
                <p className="flex items-center gap-2 font-mont">
                  <strong>Episode Count:</strong>{" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {episodes} Episode(s)
                  </span>
                </p>
                <p className="flex items-center gap-2 font-mont">
                  {" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {status}
                  </span>{" "}
                </p>
                <p className="flex items-center gap-2 font-mont">
                  {" "}
                  <AiFillStar size={24} color="gold" />
                  {score}
                </p>
                <p className="flex items-center gap-2 font-mont">
                  {" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {rating}
                  </span>{" "}
                </p>
                <p className="flex items-center gap-2 font-mont">
                  <strong>Duration:</strong>{" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {duration}
                  </span>
                </p>
                <p className="flex items-center gap-2 font-mont">
                  <strong>Type:</strong>{" "}
                  <span className="border border-gray-500 px-2 py-1 rounded">
                    {type}
                  </span>
                </p>
                <div className="flex gap-2">
                  <strong>Studios:</strong>{" "}
                  {studios.map((studio) => {
                    return (
                      <div>
                        <span className="font-mont border border-gray-500 px-2 py-1 rounded">
                          {studio.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  <strong>Genres:</strong>{" "}
                  {genres.map((genre) => {
                    return (
                      <div>
                        <span className="font-mont border border-gray-500 px-2 py-1 rounded">
                          {genre.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Link target={"_blank"} href={url}>
                <button
                  type="button"
                  className="my-8 px-4 py-2 font-mont bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-indigo-500 hover:bg-gradient-to-r hover:text-white rounded-md transition-all duration-300 text-white"
                >
                  More Details
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mirrored Background Image */}
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${images.jpg.large_image_url})`,
            opacity: 0.2,
            transform: "scaleX(-1)",
            zIndex: -1,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>
    </Layout>
  );
};

export default AnimeDetails;
