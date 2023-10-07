import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createHashHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'
import logger from 'redux-logger'
import padReducer from '../components/pad/padReducer'

const { routerMiddleware, createReduxHistory, routerReducer } =
  createReduxHistoryContext({
    history: createHashHistory(),
  })

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    pad: padReducer,
  }),
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    routerMiddleware,
    logger,
  ],
})

export const history = createReduxHistory(store)
