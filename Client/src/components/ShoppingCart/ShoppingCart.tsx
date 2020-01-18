import * as React from "react";
import { List } from "immutable";
import { Product, IDispatchProps, connectComponent } from "../../services";
import { ContentBox, Button } from "../Common";
import { ProductInCart } from "./ProductInCart/ProductInCart";

import "./ShoppingCart.scss";
import { NavLink } from "react-router-dom";

interface IShoppingCartStateProps {
    shoppingCart: List<Product>;
}

type IShoppingCartProps = IShoppingCartStateProps & IDispatchProps;

export class ShoppingCart extends React.Component<IShoppingCartProps> {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        const { shoppingCart, dispatch } = this.props;

        return (
            <ContentBox activeItem="Shopping Cart">
                {shoppingCart.count() > 0 ?
                    <div>
                        Shopping Cart
                        {shoppingCart.map((p: Product) => <ProductInCart key={p.id} product={p} dispatch={dispatch} />)}
                        <div style={{ float: "right" }}>
                            <Button style={{ marginTop: 15 }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} to="/Ordered">Place Order</NavLink>
                            </Button>
                        </div>
                    </div>
                : 
                    <div style={{ display: "flex", flexDirection: "column", height: 500, textAlign: "center" }}>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ fontWeight: "bold", fontSize: 30 }}>No products in shopping cart</div>
                        <div style={{ fontSize: 18 }}>Use the Products tab to shop our items!</div>
                        <div style={{ flexGrow: 1 }} />
                    </div>
                }
            </ContentBox>
        );
    }
}

const mapStateToProps = (store: any): IShoppingCartStateProps => {
    return {
        shoppingCart: store.shoppingCart
    };
};
export const $ShoppingCart = connectComponent(mapStateToProps, ShoppingCart);
