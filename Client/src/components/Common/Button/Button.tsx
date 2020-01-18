import * as React from "react";

import "./Button.scss";

interface IButtonOwnProps {
    onClick?: (data: any) => void;
    data?: any;
    children?: any;
    readonly?: boolean;
    style?: React.CSSProperties;
}

// Button class for default buttons
export class Button extends React.Component<IButtonOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    private onClick = (): void => {
        const { onClick, data, readonly } = this.props;

        if (onClick && readonly !== true) {
            onClick(data);
        }
    }

    public render(): React.ReactNode {
        const { children, style, readonly } = this.props;

        return (
            <div className={"button" + (readonly ? " buttonReadonly" : "")} style={style} onClick={this.onClick}>{children}</div>
        );
    }
}
