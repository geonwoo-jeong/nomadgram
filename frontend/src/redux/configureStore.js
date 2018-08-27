import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import user from "redux/modules/user";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n";
import Reactotron from "ReactotronConfig";

const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  user,
  i18nState
});

let store;

if (env === "development") {
  store = initialState =>
    Reactotron.createStore(
      connectRouter(history)(reducer),
      compose(composeWithDevTools(applyMiddleware(...middlewares)))
    );
} else {
  store = initialState =>
    createStore(
      connectRouter(history)(reducer),
      compose(applyMiddleware(...middlewares))
    );
}
export { history };
export default store();
