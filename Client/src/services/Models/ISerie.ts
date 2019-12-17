import { IVideo, Video } from "./IVideo";
import { Record, List } from "immutable";

export interface ISerie {
    id: number;
    name: string;
    videos: IVideo[];
}

export const SerieRecord = Record({
    id: undefined,
    name: undefined,
    videos: undefined
});

export class Serie extends SerieRecord {
    public id: number;
    public name: string;
    public videos: List<Video>;
}
