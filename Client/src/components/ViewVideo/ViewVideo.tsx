import * as React from "react";
import { default as axios, AxiosResponse } from "axios";
import { User, IVideo, IDispatchProps, loadVideo, unloadVideo, Video, connectComponent } from "../../services";

import "./ViewVideo.scss";
import { ContentBox, Loading } from "../Common";


interface IViewVideoOwnProps {
    match: any;
}
interface IViewVideoStateProps {
    currentUser: User;
    currentVideo: Video;
}
type IViewVideoProps = IViewVideoOwnProps & IViewVideoStateProps & IDispatchProps;

export class ViewVideo extends React.Component<IViewVideoProps> {
    constructor(props, context) {
        super(props, context);
    }

    public componentDidMount(): void {
        const { dispatch, match } = this.props;
        const { videoId } = match.params;

        axios.get(`http://localhost:5000/api/Video/${videoId}`)
            .then((videoValue: AxiosResponse<IVideo>) => {
                dispatch(loadVideo(videoValue.data));
            });
    }

    public componentWillUnmount(): void {
        const { dispatch } = this.props;

        dispatch(unloadVideo());
    }

    public render(): React.ReactNode {
        const { currentUser, currentVideo } = this.props;

        return currentUser ? (
            <ContentBox activeItem="Series">
                {currentVideo ?
                    <div>
                        <div className="viewVideoLabel">
                            <div style={{ flexGrow: 1 }}>Name</div>
                            <div>{currentVideo.name}</div>
                        </div>
                        <div className="viewVideoLabel">
                            <div style={{ flexGrow: 1 }}>Description</div>
                            <div>{currentVideo.description}</div>
                        </div>
                        <div className="viewVideoLabel">
                            <div style={{ flexGrow: 1 }}>Genre</div>
                            <div>{currentVideo.genre}</div>
                        </div>
                        <div className="viewVideoLabel">
                            <div style={{ flexGrow: 1 }}>Length in min</div>
                            <div>{currentVideo.length}</div>
                        </div>
                        <div className="viewVideoLabel">
                            <div style={{ flexGrow: 1 }}>Release Date</div>
                            <div>{new Date(currentVideo.releaseDate).toLocaleDateString()}</div>
                        </div>
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

const mapStateToProps = (store: any): IViewVideoStateProps => {
    return {
        currentUser: store.user,
        currentVideo: store.video
    };
};
export const $ViewVideo = connectComponent(mapStateToProps, ViewVideo);
