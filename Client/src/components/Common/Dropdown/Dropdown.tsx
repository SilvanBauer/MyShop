import * as React from "react";
import { IDropdownItem } from "../../../services";

import "./Dropdown.scss";

interface IDropdownOwnProps {
    label?: string;
    value?: any;
    style?: React.CSSProperties;
    dataSource: IDropdownItem[];
    onChange?: (selectedItem: any) => void;
}

// Dropdown class for default dropdowns
export class Dropdown extends React.Component<IDropdownOwnProps> {
    constructor(props, context) {
        super(props, context);
    }

    private onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { onChange } = this.props;

        onChange(event.target.value);
    }

    public render(): React.ReactNode {
        const { label, value, style, dataSource } = this.props;

        return (
            <div className="selectAndLabel" style={style}>
                <div className="label">{label}</div>
                <select className="selectComponent" value={value} onChange={this.onChange}>
                    {dataSource.map((dI: IDropdownItem) => (
                        <option key={dI.text} value={dI.data}>{dI.text}</option>
                    ))}
                </select>
            </div>
        );
    }
}
