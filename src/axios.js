const axios = require("axios").default;
const endpoint = "https://rawg-video-games-database.p.rapidapi.com";

const options = {
  baseURL: endpoint,
  headers: {
    "User-Agent": "The-Ultimate-Games-Display/0.1",
    "Content-type": "application/json",
    token: "Token 367a3539cbb94792bb4ecaef0601b21c",
    "x-rapidapi-key": "87594fe772msh55e0b060c7b1ac1p1b869bjsn1a9c545a181d",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  },
};

export default axios.create(options);
