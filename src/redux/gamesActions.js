export const SEARCH_QUERY_SET = "SEARCH_QUERY_SET";
export const PLATFORMS_SET = "PLATFORMS_SET";
export const METACRITIC_SET = "METACRITIC_SET";
export const RELEASE_DATE_SET = "RELEASE_DATE_SET";
export const PAGE_SET = "PAGE_SET";
export const ORDER_BY_SET = "ORDER_BY_SET";
export const GENRES_SET = "GENRES_SET";
export const FILTERS_RESET = "FILTERS_RESET";

export const setSearchQuery = (query) => ({
  type: SEARCH_QUERY_SET,
  payload: { query },
});

export const setPlatforms = (platforms) => ({
  type: PLATFORMS_SET,
  payload: { platforms },
});

export const setMetacritic = (metacritic) => ({
  type: METACRITIC_SET,
  payload: { metacritic },
});

export const setReleaseDate = (releaseDate) => ({
  type: RELEASE_DATE_SET,
  payload: { releaseDate },
});

export const setPage = (page) => ({
  type: PAGE_SET,
  payload: { page },
});

export const setOrderBy = (orderBy) => ({
  type: ORDER_BY_SET,
  payload: { orderBy },
});

export const setGenres = (genres) => ({
  type: GENRES_SET,
  payload: { genres },
});

export const resetFilters = () => ({
  type: FILTERS_RESET,
});
