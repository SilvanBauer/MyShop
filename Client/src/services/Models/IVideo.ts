import { IReview, Review } from "./IReview";
import { Record, List } from "immutable";

export interface IVideo {
    id: number;
    name: string;
    description: string;
    genre: string;
    length: number;
    releaseDate: Date;
    seriesId: number;
    reviews: IReview[];
}

export const VideoRecord = Record({
    id: undefined,
    name: undefined,
    description: undefined,
    genre: undefined,
    length: undefined,
    releaseDate: undefined,
    seriesId: undefined,
    reviews: undefined
});

export class Video extends VideoRecord {
    public id: number;
    public name: string;
    public description: string;
    public genre: string;
    public length: number;
    public releaseDate: Date;
    public seriesId: number;
    public reviews: List<Review>;
}
