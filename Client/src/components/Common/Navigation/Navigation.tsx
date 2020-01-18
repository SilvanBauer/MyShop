import * as React from "react";
import { NavLink } from "react-router-dom";
import { INavigationItem, getNavigationItems, getRightNavigationItems } from "../../../services";

import "./Navigation.scss";
import { $ProductsInCartInfo } from "./ProductsInCartInfo/ProductsInCartInfo";

interface INavigationOwnProps {
    activeItem: string;
}

// The navigation of the application
export class Navigation extends React.Component<INavigationOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        const { activeItem } = this.props;
        // Gets the navigation items to generate the navigation
        const items = getNavigationItems();
        const rightItems = getRightNavigationItems();

        return (
            <div className="headerComponent">
                {items.map((nI: INavigationItem) => ( // Generates the navigation items from the items
                    <NavLink
                        key={nI.header}
                        to={nI.link}
                        className={"headerItem" + (activeItem === nI.header ? " headerItemActive" : "")}
                    >
                        {nI.header}
                    </NavLink>
                ))}
                <div style={{ flexGrow: 1 }} />
                <$ProductsInCartInfo style={{ padding: 5, marginRight: 10, color: "white" }} />
                {rightItems.map((nI: INavigationItem) => ( // Generates the navigation items from the items
                    <NavLink
                        key={nI.header}
                        to={nI.link}
                        className={"headerItem headerItemLeft" + (activeItem === nI.header ? " headerItemActive" : "")}
                    >
                        {nI.header}
                    </NavLink>
                ))}
            </div>
        );
    }
}
