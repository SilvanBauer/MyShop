import { IProduct } from "../Models";
import { IAction } from "../Common";

export const Product_LOAD = "@@MyShop/Product/LOAD";
export const loadProduct = (product: IProduct) => ({ type: Product_LOAD, params: { product } } as IAction);

export const Product_UNLOAD = "@@MyShop/Product/UNLOAD";
export const unloadProduct = () => ({ type: Product_UNLOAD } as IAction);
