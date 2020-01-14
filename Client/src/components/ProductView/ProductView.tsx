import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { Product, IDispatchProps, IProduct, loadProduct, unloadProduct, connectComponent } from "../../services";

import "./ProductView.scss";
import { ContentBox, Loading, Button } from "../Common";

interface IProductOverviewOwnProps {
    match: any;
}
interface IProductOverviewStateProps {
    product: Product;
}

type IProductOverviewProps = IProductOverviewOwnProps & IProductOverviewStateProps & IDispatchProps;

export class ProductView extends React.Component<IProductOverviewProps> {
    constructor(props, context) {
        super(props, context);
    }

    public componentDidMount(): void {
        const { dispatch, match } = this.props;
        const { productId } = match.params;

        axios.get(`http://localhost:5000/api/Product/${productId}`)
            .then((value: AxiosResponse<IProduct>) => {
                dispatch(loadProduct(value.data));
            });
    }

    public componentWillUnmount(): void {
        const { dispatch } = this.props;

        dispatch(unloadProduct());
    }

    public render(): React.ReactNode {
        const { product } = this.props;

        return (
            <ContentBox activeItem="Products">
                {product ?
                    <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                        <div style={{ flexBasis: 200 }}>
                            <div>{product.name}</div>
                            <img style={{ width: 200, height: 200 }} src={require(`../../images/${product.image}`)} />
                            <div>{product.price}.-</div>
                            <Button>Add to Cart</Button>
                        </div>
                        <div style={{ flexGrow: 1, marginLeft: 30, marginRight: 30 }}>
                            {product.description}
                        </div>
                    </div>
                : <Loading />}
            </ContentBox>
        );
    }
}

const mapStateToProps = (store: any): IProductOverviewStateProps => {
    return {
        product: store.product
    };
};
export const $ProductView = connectComponent(mapStateToProps, ProductView);
