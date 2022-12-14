import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import itemsReducer from './items';
import singleItemReducer from './singleItem';
import cartReducer from './cart';

const reducer = combineReducers({ 
    auth,
    singleItem: singleItemReducer,
    items: itemsReducer,
    cart: cartReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

export * from './auth';



