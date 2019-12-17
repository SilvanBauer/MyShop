import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { List } from "immutable";
import { NavLink } from "react-router-dom";
import { Serie, IDispatchProps, ISerie, loadSeries, connectComponent, unloadSeries, User } from "../../services";
import { ContentBox, Button, Loading } from "../Common";

import "./SeriesOverview.scss";

interface ISeriesOverviewStateProps {
    series: List<Serie>;
    currentUser: User;
}

type ISeriesOverviewProps = ISeriesOverviewStateProps & IDispatchProps;

export class SeriesOverview extends React.Component<ISeriesOverviewProps> {
    constructor(props, context) {
        super(props, context);
    }

    public componentDidMount(): void {
        const { dispatch } = this.props;

        axios.get("http://localhost:5000/api/Serie")
            .then((value: AxiosResponse<ISerie[]>) => {
                dispatch(loadSeries(value.data));
            });
    }

    public componentWillUnmount(): void {
        const { dispatch } = this.props;

        dispatch(unloadSeries());
    }

    public render(): React.ReactNode {
        const { series, currentUser } = this.props;

        return currentUser ? (
            <ContentBox activeItem="Series">
                <div>
                    <h3 style={{ display: "inline" }}>Series</h3>
                    {currentUser.isAdmin ?
                        <NavLink className="button" to="/AddSerie" style={{ textDecoration: "none", color: "black", width: 30, float: "right" }}>+</NavLink>
                    : null}
                </div>
                {series ?
                    <div className="overview">
                        {series.map((s: Serie) => (
                            <NavLink key={s.id} className="button" to={`/VideoOverview/${s.id}`} style={{ textDecoration: "none", color: "black" }}>{s.name}</NavLink>
                        ))}
                    </div>
                : <Loading />}
            </ContentBox>
        ) : (
            <ContentBox activeItem="Series">
                <div style={{ color: "red" }}>You need to be logged in to view this content</div>
            </ContentBox>
        );
    }
}

const mapStateToProps = (store: any): ISeriesOverviewStateProps => {
    return {
        series: store.series,
        currentUser: store.user
    };
}
export const $SeriesOverview = connectComponent(mapStateToProps, SeriesOverview);
