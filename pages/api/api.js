// utils/api.js
const fetchAnimePictures = async (animeId) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/pictures`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime pictures:', error);
    return null;
  }
};

export default fetchAnimePictures;
