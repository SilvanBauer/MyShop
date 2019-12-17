import { IAction } from "../Common";
import { User, IUser } from "../Models";
import { User_LOGIN, User_LOGOUT } from "./actions";

const initialState = null;

export function userReducer(sliceState: User = initialState, action: IAction): User {
    const params = action.params;

    switch(action.type) {
        case User_LOGIN:
            return buildUser(params.user);
        case User_LOGOUT:
            return null;
        default:
            return sliceState;
    }
}

const buildUser = (user: IUser): User => {
    return new User(user);
}
