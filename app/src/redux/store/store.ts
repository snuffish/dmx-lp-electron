import {
  combineReducers
} from "redux";
import {
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import {
  createHashHistory
} from "history";
import {
  createReduxHistoryContext
} from "redux-first-history";
import undoable from "easy-redux-undo";
import homeReducer from "../components/home/homeSlice";
import counterReducer from "../components/counter/counterSlice";
import complexReducer from "../components/complex/complexSlice";
import padReducer from "../components/pad/padSlice";

const {
  routerMiddleware,
  createReduxHistory,
  routerReducer,
} = createReduxHistoryContext({
  history: createHashHistory()
});

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    home: homeReducer,
    pad: padReducer,
    undoable: undoable(
      combineReducers({
        counter: counterReducer,
        complex: complexReducer
      })
    )
  }),
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  }), routerMiddleware]
});

export const history = createReduxHistory(store);
