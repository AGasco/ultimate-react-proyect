import {
  SEARCH_QUERY_SET,
  PLATFORMS_SET,
  METACRITIC_SET,
  RELEASE_DATE_SET,
  PAGE_SET,
  ORDER_BY_SET,
  GENRES_SET,
  FILTERS_RESET,
} from "./gamesActions";

const initialState = {
  query: "",
  platforms: [1, 2, 3, 4, 5, 7, 8],
  metacritic: [10, 100],
  releaseDate: "1970-01-01,2021-12-31",
  page: 1,
  orderBy: "",
  genres: Array.from({ length: 19 }, (_, i) => i + 1),
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_QUERY_SET:
      return {
        ...state,
        query: action.payload.query,
      };
    case PLATFORMS_SET:
      return {
        ...state,
        platforms: action.payload.platforms,
      };
    case METACRITIC_SET:
      return {
        ...state,
        metacritic: action.payload.metacritic,
      };
    case RELEASE_DATE_SET:
      return {
        ...state,
        releaseDate: action.payload.releaseDate,
      };
    case PAGE_SET:
      return {
        ...state,
        page: action.payload.page,
      };
    case ORDER_BY_SET:
      return {
        ...state,
        orderBy: action.payload.orderBy,
      };
    case GENRES_SET:
      return {
        ...state,
        genres: action.payload.genres,
      };
    case FILTERS_RESET:
      return initialState;
    default:
      return state;
  }
};

export default gamesReducer;
