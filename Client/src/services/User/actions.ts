import { IAction } from "../Common";
import { IUser } from "../Models";

export const User_LOGIN = "@@VideoList/User/LOGIN";
export const loginUser = (user: IUser) => ({ type: User_LOGIN, params: { user } } as IAction);

export const User_LOGOUT = "@@VideoList/User/LOGOUT";
export const logoutUser = () => ({ type: User_LOGOUT } as IAction);
