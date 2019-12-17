import * as React from "react";

import "./Button.scss";

interface IButtonOwnProps {
    onClick?: (data: any) => void;
    data?: any;
    children?: any;
    style?: React.CSSProperties;
}

// Button class for default buttons
export class Button extends React.Component<IButtonOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    private onClick = (): void => {
        const { onClick, data } = this.props;

        if (onClick) {
            onClick(data);
        }
    }

    public render(): React.ReactNode {
        const { children, style } = this.props;

        return (
            <div className="button" style={style} onClick={this.onClick}>{children}</div>
        );
    }
}
