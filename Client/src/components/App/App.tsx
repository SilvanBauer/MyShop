import * as React from "react";
import { ContentBox } from "../Common";

import "./App.scss";

export class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    public render() {
        return (
            <ContentBox activeItem="Home" style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", height: 500 }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ fontWeight: "bold", fontSize: 30 }}>Welcome to My Shop!</div>
                    <div style={{ fontSize: 18 }}>Products for everything and everyone!</div>
                    <div style={{ flexGrow: 1 }} />
                </div>
            </ContentBox>
        );
    }
}
