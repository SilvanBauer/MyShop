import { Record } from "immutable";

export interface IUser {
    id: number;
    username: string;
    unencryptedPassword: string;
    isAdmin: boolean;
}

export const UserRecord = Record ({
    id: undefined,
    username: undefined,
    unencryptedPassword: undefined,
    isAdmin: undefined
});

export class User extends UserRecord {
    public id: number;
    public username: string;
    public unencryptedPassword: string;
    public isAdmin: boolean;
}
