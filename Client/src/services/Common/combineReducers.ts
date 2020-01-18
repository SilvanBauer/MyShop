import { combineReducers } from "redux";
import { productOverviewReducer, productViewReducer, shoppingCartReducer } from "..";

// Combines all redux reducers to one because there only needs to be one store
export const combinedReducers = combineReducers({
    products: productOverviewReducer,
    product: productViewReducer,
    shoppingCart: shoppingCartReducer
});
