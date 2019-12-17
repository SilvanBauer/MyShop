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
                Welcome to the Video List!!!
            </ContentBox>
        );
    }
}
