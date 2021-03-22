import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import fetchReducer from "./fetchReducer";
import gamesReducer from "./gamesReducer";
import authReducer from "./authReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    fetch: fetchReducer,
    games: gamesReducer,
    auth: authReducer,
  }),
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
