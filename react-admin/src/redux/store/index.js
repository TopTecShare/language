// import { createStore, applyMiddleware, compose } from "redux";
// import reducers from "../reducers";
// // import rootSaga from "../sagas/index";
// import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import {reduxBatch} from "@manaflair/redux-batch";
// import {persistStore} from "redux-persist";
// import {rootReducer, rootSaga} from "../rootReducer";

// const sagaMiddleware = createSagaMiddleware();
// const middleware = [
//   ...getDefaultMiddleware({
//     immutableCheck: false,
//     serializableCheck: false,
//     thunk: true
//   }),
//   sagaMiddleware
// ];

// const store = configureStore({
//   reducer: rootReducer,
//   middleware,
//   devTools: process.env.NODE_ENV !== "production",
//   enhancers: [reduxBatch],
// });

// export const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

function configureStore(preloadedState) {
 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store = configureStore();

export default store;

