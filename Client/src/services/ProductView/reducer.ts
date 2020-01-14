import { IAction } from "../Common";
import { Product, IProduct } from "../Models";
import { Product_LOAD, Product_UNLOAD } from "./actions";

const initialState = null;

export function productViewReducer(sliceState: Product = initialState, action: IAction): Product {
    const params = action.params;

    switch(action.type) {
        case Product_LOAD:
            return buildProduct(params.product);
        case Product_UNLOAD:
            return null;
        default:
            return sliceState;
    }
}

const buildProduct = (product: IProduct): Product => {
    return new Product(product);
};
