import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { todoEpics } from "./modules/todo-list/actions";
import todoReducers from "./modules/todo-list/reducers";

const rootEpic = combineEpics(...Object.values(todoEpics));
const epicMiddleware = createEpicMiddleware();
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
export const rootReducer = combineReducers({
  todos: todoReducers
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);
epicMiddleware.run(rootEpic);

export default store;
