import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { NavLink } from "react-router-dom";
import { List } from "immutable";
import { User, IDispatchProps, IVideo, loadVideos, Video, connectComponent, unloadVideos, ISerie } from "../../services";
import { ContentBox, Loading, Button } from "../Common";

import "./VideoOverview.scss";

interface IVideoOverviewOwnProps {
    match: any;
}
interface IVideoOverviewStateProps {
    videos: List<Video>;
    currentUser: User;
}
interface IVideoOverviewState {
    currentSerie: ISerie;
}
type IVideoOverviewProps = IVideoOverviewOwnProps & IVideoOverviewStateProps & IDispatchProps;

export class VideoOverview extends React.Component<IVideoOverviewProps, IVideoOverviewState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentSerie: undefined
        };
    }

    public componentDidMount(): void {
        const { dispatch, match } = this.props;
        const { seriesId } = match.params;

        axios.get(`http://localhost:5000/api/Serie/${seriesId}`)
            .then((serieValue: AxiosResponse<ISerie>) => {
                this.setState({ currentSerie: serieValue.data});

                axios.get(`http://localhost:5000/api/Video/GetVideosBySeriesId/${seriesId}`)
                    .then((value: AxiosResponse<IVideo[]>) => {
                        dispatch(loadVideos(value.data));
                    });
            });
    }

    public componentWillUnmount(): void {
        const { dispatch } = this.props;

        dispatch(unloadVideos());
    }

    public render(): React.ReactNode {
        const { videos, currentUser, match } = this.props;
        const { currentSerie } = this.state;
        const { seriesId } = match.params;

        return currentUser ? (
            <ContentBox activeItem="Series">
                <div>
                    <h3 style={{ display: "inline" }}>{currentSerie ? currentSerie.name : ""}</h3>
                    {currentUser.isAdmin ?
                        <NavLink className="button" to={`/AddVideo/${seriesId}`} style={{ textDecoration: "none", color: "black", width: 30, float: "right" }}>+</NavLink>    
                    : null}
                </div>
                {videos ?
                    <div className="overview">
                        {videos.map((v: Video) => (
                            <NavLink key={v.id} className="button" style={{ textDecoration: "none", color: "black" }} to={`/ViewVideo/${v.id}`}>{v.name}</NavLink>
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

const mapStateToProps = (store: any): IVideoOverviewStateProps => {
    return {
        videos: store.videos,
        currentUser: store.user
    };
};
export const $VideoOverview = connectComponent(mapStateToProps, VideoOverview);
