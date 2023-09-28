import { compose } from "redux";

export const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;