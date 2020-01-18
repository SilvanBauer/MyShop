import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { List } from "immutable";
import { IDispatchProps, emptyCart, connectComponent, Product } from "../../services";
import { ContentBox } from "../Common";

import "./Ordered.scss";

interface IOrderedStateProps {
    shoppingCart: List<Product>;
}

type IOrderedProps = IOrderedStateProps & IDispatchProps;

export class Ordered extends React.Component<IOrderedProps> {
    constructor(props, context) {
        super(props, context);
    }

    public componentDidMount(): void {
        const { dispatch, shoppingCart } = this.props;

        axios.post("http://localhost:5000/api/Order", shoppingCart)
            .then(() => {
                dispatch(emptyCart());
            });
    }

    public render(): React.ReactNode {
        return (
            <ContentBox activeItem={"Shopping Cart"} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", height: 500 }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ fontWeight: "bold", fontSize: 30 }}>Your order is processing!</div>
                    <div style={{ fontSize: 18 }}>Thank you for your order!</div>
                    <div style={{ flexGrow: 1 }} />
                </div>
            </ContentBox>
        );
    }
}

const mapStateToProps = (store: any): IOrderedStateProps => {
    return {
        shoppingCart: store.shoppingCart
    };
};
export const $Ordered = connectComponent(mapStateToProps, Ordered);
