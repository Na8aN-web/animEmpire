// pages/index.js
import React from "react";
import AnimeCarousel from "../components/AnimeCarousel";
import Layout from "@/components/Layout";
import AnimeRecent from "@/components/AnimeRecent";
import AnimeUpcoming from "../components/AnimeUpcoming";
import AnimeTop from "@/components/AnimeTop";

const Home = () => {
  return (
    <div>
      <Layout>
        <AnimeCarousel />
        <AnimeRecent />
        <AnimeTop />
        <AnimeUpcoming />
      </Layout>
    </div>
  );
};

export default Home;
