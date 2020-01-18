import * as React from "react";
import { Product, removeProductFromCart } from "../../../services";

import "./ProductInCart.scss";

interface IProductInCartOwnProps {
    product: Product;
    dispatch: any;
}

export class ProductInCart extends React.Component<IProductInCartOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    private removeProductFromCart = (): void => {
        const { product, dispatch } = this.props;

        dispatch(removeProductFromCart(product.id));
    }

    public render(): React.ReactNode {
        const { product } = this.props;

        return (
            <div className="productInCart">
                <div style={{ flexGrow: 1 }}>{product.name}</div>
                <div style={{ flexBasis: 100 }}>{product.price}.-</div>
                <div className="productInCartX" onClick={this.removeProductFromCart}>X</div>
            </div>
        );
    }
}
