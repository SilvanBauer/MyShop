import { Product } from "../Models";
import { IAction } from "../Common";

export const Cart_ADD_PRODUCT = "@@MyShop/Cart/ADD_PRODUCT";
export const addProductToCart = (product: Product) => ({ type: Cart_ADD_PRODUCT, params: { product } } as IAction);

export const Cart_REMOVE_PRODUCT = "@@MyShop/Cart/REMOVE_PRODUCT";
export const removeProductFromCart = (id: number) => ({ type: Cart_REMOVE_PRODUCT, params: { id } } as IAction);

export const Cart_EMPTY = "@@MyShop/Cart/EMPTY";
export const emptyCart = () => ({ type: Cart_EMPTY } as IAction);
