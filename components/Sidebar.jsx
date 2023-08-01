import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Sidebar = ({ onCloseSidebar }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get('https://api.jikan.moe/v4/genres/anime')
      .then(response => {
        setGenres(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(genres);

  return (
    <div className={`fixed inset-0 bg-gray-800 py-16 md:pt-24 z-10 overflow-y-scroll custom-scrollbar transform transition-transform duration-300 ${genres.length > 0 ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col items-center justify-center">
        <button className="text-white text-2xl absolute top-6 right-6 focus:outline-none" onClick={onCloseSidebar}>
          ✕
        </button>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8  p-8 md:p-2 overflow-y-scroll  custom-scrollbar">
          {genres.map(genre => (
            <Link href={`/${genre.mal_id}`} key={genre.mal_id}>
              <div className="text-white max-w-[200px] cursor-pointer">
                <h3 className="text-[13px] md:text-xl mt-2 w-full font-mont neon-glow hover:font-bold">{genre.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
