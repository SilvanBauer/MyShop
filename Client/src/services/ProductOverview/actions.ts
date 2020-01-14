import { IProduct } from "../Models";
import { IAction } from "../Common";

export const Products_LOAD = "@@MyShop/Products/LOAD";
export const loadProducts = (products: IProduct[]) => ({ type: Products_LOAD, params: { products } } as IAction);

export const Products_UNLOAD = "@@MyShop/Products/UNLOAD";
export const unloadProducts = () => ({ type: Products_UNLOAD } as IAction);
