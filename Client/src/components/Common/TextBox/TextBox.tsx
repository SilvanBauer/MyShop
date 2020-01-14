import * as React from "react";

import "./TextBox.scss";

interface ITextBoxOwnProps {
    label?: string;
    value?: string;
    style?: React.CSSProperties;
    type?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

// TextBox class for default textboxes
export class TextBox extends React.Component<ITextBoxOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { onChange } = this.props;

        onChange(event.target.value);
    }

    public render(): React.ReactNode {
        const { label, value, style, type, placeholder } = this.props;

        return (
            <div className="inputAndLabel" style={style}>
                <div className="label">{label}</div>
                <input type={type} className="inputComponent" value={value} onChange={this.onChange} placeholder={placeholder} />
            </div>
        );
    }
}
