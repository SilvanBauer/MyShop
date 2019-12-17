import { ISerie } from "../Models";
import { IAction } from "../Common";

export const Series_LOAD = "@@VideoList/Series/LOAD";
export const loadSeries = (series: ISerie[]) => ({ type: Series_LOAD, params: { series } } as IAction);

export const Series_UNLOAD = "@@VideoList/Series/UNLOAD";
export const unloadSeries = () => ({ type: Series_UNLOAD } as IAction);
