import { FETCH_BEGAN, FETCH_SUCCEEDED, FETCH_FAILED } from "./fetchActions";

const initialState = {
  games: [],
  loading: false,
  error: null,
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BEGAN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUCCEEDED:
      return {
        ...state,
        loading: false,
        games: action.payload.data,
      };
    case FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        games: [],
      };
    default:
      return state;
  }
};

export default fetchReducer;
