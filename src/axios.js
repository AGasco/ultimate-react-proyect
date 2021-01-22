const axios = require("axios").default;
const endpoint = "https://rawg-video-games-database.p.rapidapi.com/games";

const options = {
  method: "GET",
  url: endpoint,
  headers: {
    "User-Agent": "The-Ultimate-Games-Display/0.1",
    "x-rapidapi-key": "87594fe772msh55e0b060c7b1ac1p1b869bjsn1a9c545a181d",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  },
};

const getGames = async () => {
  await axios
    .request(options)
    .then((res) => {
      console.log("request", res.data);
      return res.data;
    })
    .catch((error) => console.error(error));
};

export default getGames;
