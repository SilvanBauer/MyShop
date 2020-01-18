import * as React from "react";
import { List } from "immutable";
import { Product, connectComponent } from "../../../../services";

import "./ProductsInCartInfo.scss";

interface IProductsInCartInfoOwnProps {
    style: React.CSSProperties;
}
interface IProductsInCartInfoStateProps {
    shoppingCart: List<Product>;
}

type IProductsInCartInfoProps = IProductsInCartInfoOwnProps & IProductsInCartInfoStateProps;

export class ProductsInCartInfo extends React.Component<IProductsInCartInfoProps> {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        const { shoppingCart, style } = this.props;
        let totalPrice = 0.0;

        shoppingCart.forEach((p: Product) => totalPrice += p.price)

        return (
            <div style={style}>{shoppingCart.count()} Products for {totalPrice}.-</div>
        );
    }
}

const mapStateToProps = (store: any): IProductsInCartInfoStateProps => {
    return {
        shoppingCart: store.shoppingCart
    };
};
export const $ProductsInCartInfo = connectComponent(mapStateToProps, ProductsInCartInfo);
