import * as React from "react";

import "./Footer.scss";

// Footer of the application
export class Footer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className="footer">
                Silvan Bauer © 2019
            </div>
        );
    }
}
