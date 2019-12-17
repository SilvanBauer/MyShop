import { IVideo } from "../Models";
import { IAction } from "../Common";

export const Video_LOAD = "@@VideoList/Video/LOAD";
export const loadVideo = (video: IVideo) => ({ type: Video_LOAD, params: { video } } as IAction);

export const Video_UNLOAD = "@@VideoList/Video/UNLOAD";
export const unloadVideo = () => ({ type: Video_UNLOAD } as IAction);
