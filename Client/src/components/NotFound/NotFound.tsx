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
                <h1>404 Not Found</h1>
            </ContentBox>
        );
    }
}
