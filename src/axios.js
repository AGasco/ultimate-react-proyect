const axios = require("axios").default;
const endpoint = "https://rawg-video-games-database.p.rapidapi.com";
export const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

const options = {
  baseURL: endpoint,
  headers: {
    // "User-Agent": "The-Ultimate-Games-Display/0.1",
    "Content-type": "application/json",
    token: API_KEY,
    "x-rapidapi-key": process.env.REACT_APP_RAWG_RAPIDAPI_KEY,
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  },
};

export default axios.create(options);
