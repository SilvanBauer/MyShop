import { List } from "immutable";
import { IAction } from "../Common";
import { Serie, IVideo, Video, ISerie } from "../Models";
import { Series_UNLOAD, Series_LOAD } from "./actions";

const initialState = null;

export function seriesOverviewReducer(sliceState: List<Serie> = initialState, action: IAction): List<Serie> {
    const params = action.params;

    switch (action.type) {
        case Series_LOAD:
            return buildSeries(params.series);
        case Series_UNLOAD:
            return null;
        default:
            return sliceState;
    }
}

const buildSeries = (series: ISerie[]): List<Serie> => {
    return List(series.map((s: ISerie) => new Serie(s)));
};
