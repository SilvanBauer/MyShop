import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { List } from "immutable";
import { Product, IDispatchProps, IProduct, loadProducts, unloadProducts, connectComponent } from "../../services";
import { ContentBox, Loading } from "../Common";
import { ProductItem } from "./ProductItem/ProductItem";

import "./ProductOverview.scss";

interface IProductOverviewStateProps {
    products: List<Product>
}

type IProductOverviewProps = IProductOverviewStateProps & IDispatchProps;

export class ProductOverview extends React.Component<IProductOverviewProps> {
    constructor(props, context) {
        super(props, context);
    }

    public componentDidMount(): void {
        const { dispatch } = this.props;

        axios.get(`http://localhost:5000/api/Product`)
            .then((value: AxiosResponse<IProduct[]>) => {
                dispatch(loadProducts(value.data));
            });
    }

    public componentWillUnmount(): void {
        const { dispatch } = this.props;

        dispatch(unloadProducts());
    }

    public render(): React.ReactNode {
        const { products } = this.props;

        return (
            <ContentBox activeItem="Products">
                {products ?
                    <div className="overview" style={{ overflow: "auto", margin: "auto", width: 1000, height: 600 }}>
                        {products.map((p: Product) => (
                            <ProductItem key={p.id} product={p} />
                        ))}
                    </div>
                : <Loading />}
            </ContentBox>
        );
    }
}

const mapStateToProps = (store: any): IProductOverviewStateProps => {
    return {
        products: store.products
    };
};
export const $ProductOverview = connectComponent(mapStateToProps, ProductOverview);
