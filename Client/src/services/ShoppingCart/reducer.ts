import { List } from "immutable";
import { IAction } from "../Common";
import { Product } from "../Models";
import { Cart_ADD_PRODUCT, Cart_REMOVE_PRODUCT, Cart_EMPTY } from "./actions";

const initialState = List<Product>();

export function shoppingCartReducer(sliceState: List<Product> = initialState, action: IAction): List<Product> {
    const params = action.params;

    switch(action.type) {
        case Cart_ADD_PRODUCT:
            return addProduct(params.product, sliceState);
        case Cart_REMOVE_PRODUCT:
            return removeProduct(params.id, sliceState);
        case Cart_EMPTY:
            return sliceState.clear();
        default:
            return sliceState;
    }
}

const addProduct = (product: Product, sliceState: List<Product>): List<Product> => {
    return sliceState.set(sliceState.count(), product);
};

const removeProduct = (id: number, sliceState: List<Product>): List<Product> => {
    const product = sliceState.filter((p: Product) => p.id === id).first() as Product;
    const productIndex = sliceState.indexOf(product);

    return sliceState.remove(productIndex);
};
