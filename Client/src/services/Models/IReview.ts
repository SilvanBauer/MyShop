import { Record } from "immutable";

export interface IReview {
    reviewText: string;
    rating: number;
}

export const ReviewRecord = Record({
    reviewText: undefined,
    rating: undefined
});

export class Review extends ReviewRecord {
    public reviewText: string;
    public rating: number;
}
