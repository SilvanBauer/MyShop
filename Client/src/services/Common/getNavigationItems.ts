import { INavigationItem } from "./INavigationItem";

// Returns the navigation items
export const getNavigationItems = (): INavigationItem[] => [
    { header: "Home", link: "/" }
] as INavigationItem[];
