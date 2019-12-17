import { List } from "immutable";
import { Video, IVideo } from "../Models";
import { IAction } from "../Common";
import { Videos_LOAD, Videos_UNLOAD } from "./actions";

const initialState = null;

export function videoOverviewReducer(sliceState: List<Video> = initialState, action: IAction): List<Video> {
    const params = action.params;

    switch(action.type) {
        case Videos_LOAD:
            return buildVideos(params.videos);
        case Videos_UNLOAD:
            return null;
        default:
            return sliceState;
    }
}

const buildVideos = (videos: IVideo[]): List<Video> => {
    return List(videos.map((v: IVideo) => new Video(v)));
};
