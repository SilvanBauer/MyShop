import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { List } from "immutable";
import { Product, IDispatchProps, IProduct, loadProduct, unloadProduct, connectComponent, addProductToCart } from "../../services";
import { ContentBox, Loading, Button } from "../Common";

import "./ProductView.scss";

interface IProductViewOwnProps {
    match: any;
}
interface IProductViewStateProps {
    product: Product;
    shoppingCart: List<Product>;
}
interface IProductViewState {
    productAlreadyInCart: boolean;
}

type IProductViewProps = IProductViewOwnProps & IProductViewStateProps & IDispatchProps;

export class ProductView extends React.Component<IProductViewProps, IProductViewState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            productAlreadyInCart: undefined
        }
    }

    public componentDidMount(): void {
        const { dispatch, match, shoppingCart } = this.props;
        const { productId } = match.params;

        axios.get(`http://localhost:5000/api/Product/${productId}`)
            .then((value: AxiosResponse<IProduct>) => {
                dispatch(loadProduct(value.data ? value.data : { id: 0 } as IProduct));

                this.setState({ productAlreadyInCart: shoppingCart.filter((p: Product) => p.id === value.data.id).count() > 0 });
            });
    }

    public componentWillUnmount(): void {
        const { dispatch } = this.props;

        dispatch(unloadProduct());
    }

    private addToCartClick = (): void => {
        const { dispatch, product } = this.props;

        dispatch(addProductToCart(product));

        this.setState({ productAlreadyInCart: true });
    }

    public render(): React.ReactNode {
        const { product } = this.props;
        const { productAlreadyInCart } = this.state;

        return (
            <ContentBox activeItem="Products">
                {product ?
                    product.id !== 0 ?
                        <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                            <div style={{ flexBasis: 200 }}>
                                <div>{product.name}</div>
                                <img style={{ width: 200, height: 200 }} src={product.image} />
                                <div>{product.price}.-</div>
                                <Button readonly={productAlreadyInCart} onClick={this.addToCartClick}>{productAlreadyInCart ? "Already in cart" : "Add to Cart"}</Button>
                            </div>
                            <div style={{ flexGrow: 1, marginLeft: 30, marginRight: 30 }}>
                                {product.description}
                            </div>
                        </div>
                    :
                    <div style={{ display: "flex", flexDirection: "column", height: 500, textAlign: "center" }}>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ fontWeight: "bold", fontSize: 30 }}>404 Product not found</div>
                        <div style={{ fontSize: 18 }}>Please choose another of our amazing products!</div>
                        <div style={{ flexGrow: 1 }} />
                    </div>
                : <Loading />}
            </ContentBox>
        );
    }
}

const mapStateToProps = (store: any): IProductViewStateProps => {
    return {
        product: store.product,
        shoppingCart: store.shoppingCart
    };
};
export const $ProductView = connectComponent(mapStateToProps, ProductView);
