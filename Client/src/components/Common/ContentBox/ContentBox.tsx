import * as React from "react";
import { Navigation, Footer } from "../";

import "./ContentBox.scss";

interface IContentBoxOwnProps {
    activeItem: string;
    children: any;
    style?: React.CSSProperties;
}

// Wrapper which displays the content with a navigation and footer
export class ContentBox extends React.Component<IContentBoxOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        const { activeItem, children, style } = this.props;

        return (
            <div className="main">
                <div style={{ flexGrow: 1 }} />
                <div style={{ width: "100%", maxWidth: "1200px" }}>
                    <Navigation activeItem={activeItem} />
                    <div className="content" style={style}>
                        {children}
                    </div>
                </div>
                <div style={{ flexGrow: 1 }} />
            </div>
        );
    }
}
