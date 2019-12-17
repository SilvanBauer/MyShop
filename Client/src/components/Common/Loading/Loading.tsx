import * as React from "react";

import "./Loading.scss";

interface ILoadingOwnProps {
    text?: string;
}

// This component can be displayed while something is loading
export class Loading extends React.Component<ILoadingOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        const { text } = this.props;

        return (
            <div style={{ textAlign: "center" }}>{text ? text : "Loading..."}</div>
        );
    }
}
