import * as React from "react";
import { ContentBox } from "../Common";

import "./NotFound.scss";

export class NotFound extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <ContentBox activeItem={undefined} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", height: 500 }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ fontWeight: "bold", fontSize: 30 }}>404 Page not found</div>
                    <div style={{ fontSize: 18 }}>You can shop our products in the Products tab!</div>
                    <div style={{ flexGrow: 1 }} />
                </div>
            </ContentBox>
        );
    }
}
