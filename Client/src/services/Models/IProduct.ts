import { Record } from "immutable";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export const ProductRecord = Record({
    id: undefined,
    name: undefined,
    description: undefined,
    price: undefined,
    image: undefined
});

export class Product extends ProductRecord {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public image: string;
}
