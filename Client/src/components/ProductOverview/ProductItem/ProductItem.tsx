import * as React from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../../../services";

import "./ProductItem.scss";

interface IProductItemOwnProps {
    product: Product;
}

export class ProductItem extends React.Component<IProductItemOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        const { product } = this.props;

        return (
            <NavLink style={{ textDecoration: "none", color: "black" }} to={`/Product/${product.id}`}>
                <div style={{ background: "#bcbcf5", padding: 10, width: 200, height: 220, border: "1px solid black", margin: 10 }}>
                    <img style={{ height: 200, width: 200 }} src={require(`../../../images/${product.image}`)} />
                    <div style={{ textAlign: "center", fontSize: 15, marginTop: 5 }}>{product.price}.- {product.name}</div>
                </div>
            </NavLink>
        );
    }
}
