import { INavigationItem } from "./INavigationItem";

// Returns the navigation items
export const getNavigationItems = (): INavigationItem[] => [
    { header: "Home", link: "/" },
    { header: "Products", link: "/Products" }
] as INavigationItem[];

// Returns right aligned navigation items
export const getRightNavigationItems = (): INavigationItem[] => [
    { header: "Shopping Cart", link: "/ShoppingCart" }
] as INavigationItem[];
