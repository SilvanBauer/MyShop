import { IAction } from "../Common";
import { IVideo } from "../Models";

export const Videos_LOAD = "@@VideoList/Videos/LOAD";
export const loadVideos = (videos: IVideo[]) => ({ type: Videos_LOAD, params: { videos } } as IAction);

export const Videos_UNLOAD = "@@VideoList/Videos/UNLOAD";
export const unloadVideos = () => ({ type: Videos_UNLOAD } as IAction);
