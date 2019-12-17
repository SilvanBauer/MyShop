import { connect } from "react-redux";
import { IDispatchProps } from "./IDispatchProps";

// Maps dispatch to the props, so that a connected component can use this dispatch to change the redux application store
const mapDispatchToProps = (dispatch: any): IDispatchProps => {
    return {
        dispatch
    };
}

// Connects the component with the store
export const connectComponent = (mapStateToProps: (store: any) => any, component: any): any =>
    connect(mapStateToProps, mapDispatchToProps)(component);
