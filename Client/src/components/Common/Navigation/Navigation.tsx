import * as React from "react";
import { default as axios } from "axios";
import { NavLink } from "react-router-dom";
import { INavigationItem, getNavigationItems, IDispatchProps, User, connectComponent, logoutUser } from "../../../services";

import "./Navigation.scss";

interface INavigationOwnProps {
    activeItem: string;
}
interface INavigationStateProps {
    currentUser: User;
}
type INavigationProps = INavigationOwnProps & INavigationStateProps & IDispatchProps;

// The navigation of the application
export class Navigation extends React.Component<INavigationProps> {
    constructor(props, context) {
        super(props, context);
    }

    private onLogout = (): void => {
        const { dispatch, currentUser } = this.props;

        axios.put("http://localhost:5000/api/User/Logout", currentUser);
        
        dispatch(logoutUser());

        alert("User successfully logged out");
    }

    public render(): React.ReactNode {
        const { activeItem, currentUser } = this.props;
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
                {currentUser ? // Adds a Login/Logout button
                    <div className={"headerItem" + (activeItem === "Login" ? " headerItemActive" : "")} style={{ float: "right", borderLeft: "1px solid #8c94b6" }} onClick={this.onLogout}>
                        Logout
                    </div>
                    :
                    <NavLink to="/Login" className={"headerItem" + (activeItem === "Login" ? " headerItemActive" : "")} style={{ float: "right", borderLeft: "1px solid #8c94b6" }}>
                        Login
                    </NavLink>
                }                
            </div>
        );
    }
}

const mapStateToProps = (store: any): INavigationStateProps => {
    return {
        currentUser: store.user
    };
}
export const $Navigation = connectComponent(mapStateToProps, Navigation);
