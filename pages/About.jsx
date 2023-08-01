import React from "react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <section className="bg-gray-900 text-white py-32 md:py-32">
        <div className=" mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold neon-glow font-mont mb-6">
            animEmpire - Your Ultimate Anime Website
          </h2>
          <p className="text-md md:text-xl mb-8 font-mont">
            animEmpire is a comprehensive and user-friendly anime website
            designed to cater to all anime enthusiasts. We aim to provide a
            seamless and enjoyable experience for fans of Japanese animation,
            offering detailed information on a vast array of anime sites using
            MyAnimeList Jikan API.
          </p>
          <h3 className="text-2xl md:text-4xl font-bold neon-glow font-mont mb-4">
            Key Features:
          </h3>
          <ul className="list-disc list-inside text-lg md:text-xl mb-8 font-mont">
            <li>
              <strong>Anime Library:</strong> Our website boasts an extensive
              library of anime titles, covering classic favorites, ongoing
              series, and the latest releases.
            </li>
            <li>
              <strong>User-friendly Navigation:</strong> The intuitive and
              visually appealing navigation system ensures smooth exploration
              throughout the website. A well-organized sidebar allows users to
              access various categories, genres, and filter options
              effortlessly.
            </li>
            <li>
              <strong>Trending Anime Carousel:</strong> Stay updated with the
              hottest and most popular anime through our dynamic carousel on the
              homepage. The carousel showcases visually stunning images of
              trending anime titles, enticing users to explore further.
            </li>
            {/* Add more key features here */}
          </ul>
          <h3 className="text-2xl md:text-4xl font-bold neon-glow font-mont mb-4">
            Mission:
          </h3>
          <p className="text-md md:text-xl mb-8 font-mont">
            animEmpire's mission is to be the go-to destination for all anime
            enthusiasts, providing a well-curated and updated collection of
            anime titles, I'm dedicated to continuously improving and expanding
            the website's features to enhance user satisfaction and deliver the
            ultimate anime experience.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
