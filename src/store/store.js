import {  legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { composeEnhancer } from "../store/enhancer/enhancer";
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";



const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger, thunk].filter(Boolean);

const composeEnhanced = 
  (process.env.NODE_ENV !== "production" && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

const composedEnhancers = compose(composeWithDevTools(applyMiddleware(...middleWares)))

export const store = createStore(
  persistedReducer, 
  undefined, 
  composedEnhancers,
  
  );

export const persistor = persistStore(store);