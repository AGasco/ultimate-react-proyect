import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import fetchReducer from "./fetchReducer";
import gamesReducer from "./gamesReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ fetch: fetchReducer, games: gamesReducer }),
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
