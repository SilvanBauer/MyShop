import * as React from "react";
import { NavLink } from "react-router-dom";
import { INavigationItem, getNavigationItems } from "../../../services";

import "./Navigation.scss";

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

        return (
            <div className="headerComponent">
                {items.map((nI: INavigationItem, index: number) => ( // Generates the navigation items from the items
                    <NavLink
                        key={nI.header}
                        to={nI.link}
                        className={"headerItem" + (activeItem === nI.header ? " headerItemActive" : "")}
                    >
                        {nI.header}
                    </NavLink>
                ))}
                <div style={{ flexGrow: 1 }} />             
            </div>
        );
    }
}
