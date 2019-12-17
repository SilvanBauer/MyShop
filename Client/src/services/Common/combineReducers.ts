import { combineReducers } from "redux";
import { seriesOverviewReducer, userReducer, videoOverviewReducer, viewVideoReducer } from "..";

// Combines all redux reducers to one because there only needs to be one store
export const combinedReducers = combineReducers({
    series: seriesOverviewReducer,
    videos: videoOverviewReducer,
    user: userReducer,
    video: viewVideoReducer
});
