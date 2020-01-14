import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { List } from "immutable";
import { Product, IDispatchProps, IProduct, loadProducts, unloadProducts, connectComponent } from "../../services";
import { ContentBox, Loading, TextBox, Button } from "../Common";
import { ProductItem } from "./ProductItem/ProductItem";

import "./ProductOverview.scss";

interface IProductOverviewStateProps {
    products: List<Product>
}
interface IProductOverviewState {
    search: string;
    displayedProducts: List<Product>;
}

type IProductOverviewProps = IProductOverviewStateProps & IDispatchProps;

export class ProductOverview extends React.Component<IProductOverviewProps, IProductOverviewState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            search: "",
            displayedProducts: undefined
        };
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

    private onSearchChange = (search: string) => this.setState({ search });

    private onSearchClick = () => {
        const { products } = this.props;
        const { search } = this.state;

        this.setState({ displayedProducts: products.filter((p: Product) => p.name.toLowerCase().startsWith(search.toLowerCase())) });
    }

    public render(): React.ReactNode {
        const { products } = this.props;
        const { search, displayedProducts } = this.state;
        const productsToDisplay = displayedProducts || products;

        return (
            <ContentBox activeItem="Products">
                <div style={{ display: "flex", flexDirection: "row", width: 1100, margin: "auto" }}>
                    <TextBox style={{ flexGrow: 1, marginRight: 10 }} type="text" placeholder="Search" value={search} onChange={this.onSearchChange} />
                    <Button onClick={this.onSearchClick}>Search</Button>
                </div>
                {productsToDisplay ?
                    <div className="overview" style={{ overflow: "auto", margin: "auto", marginTop: 10, width: 1000, height: 550 }}>
                        {productsToDisplay.map((p: Product) => (
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
