import { List } from "immutable";
import { IAction } from "../Common";
import { Product, IProduct } from "../Models";
import { Products_LOAD, Products_UNLOAD } from "./actions";

const initialState = null;

export function productOverviewReducer(sliceState: List<Product> = initialState, action: IAction): List<Product> {
    const params = action.params;

    switch (action.type) {
        case Products_LOAD:
            return buildProducts(params.products);
        case Products_UNLOAD:
            return null;
        default:
            return sliceState;
    }
}

const buildProducts = (products: IProduct[]): List<Product> => {
    return List(products.map((p: IProduct) => new Product(p)));
};
