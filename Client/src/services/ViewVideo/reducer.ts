import { IAction } from "../Common";
import { Video, IVideo } from "../Models";
import { Video_LOAD, Video_UNLOAD } from "./actions";

const initialState = null;

export function viewVideoReducer(sliceState: Video = initialState, action: IAction): Video {
    const params = action.params;

    switch(action.type) {
        case Video_LOAD:
            return buildVideo(params.video);
        case Video_UNLOAD:
            return null;
        default:
            return sliceState;
    }
}

const buildVideo = (video: IVideo): Video => {
    return new Video(video);
};
