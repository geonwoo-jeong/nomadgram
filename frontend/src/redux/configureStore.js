import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import users from "redux/modules/users";
import createHistory from "history/createBrowserHistory";

const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  users
});

let store = initialState =>
  createStore(
    connectRouter(history)(reducer),
    compose(applyMiddleware(...middlewares))
  );
export { history };
export default store();
