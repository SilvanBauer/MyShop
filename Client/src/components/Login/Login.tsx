import * as React from "react";
import Axios, { default as axios, AxiosResponse } from "axios";
import { IDispatchProps, IUser, connectComponent, loginUser, User } from "../../services";
import { ContentBox, TextBox, Button } from "../Common";

import "./Login.scss";

interface ILoginStateProps {
    currentUser: User;
}
interface ILoginState {
    username: string;
    password: string;
}
type ILoginProps = ILoginStateProps & IDispatchProps;

export class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: ""
        };
    }

    private onUsernameChange = (username: string): void => this.setState({ username });

    private onPasswordChange = (password: string): void => this.setState({ password });

    private onLoginClick = (): void => {
        const { dispatch } = this.props;
        const { username, password } = this.state;

        if (username === undefined || username === null || username.trim() === "") {
            alert("You need to enter a username");
        } else if (password === undefined || password === null || password.trim() === "") {
            alert("You need to enter a password");
        } else {
            axios.put("http://localhost:5000/api/User/Login", { username, unencryptedPassword: password })
                .then((value: AxiosResponse<IUser>) => {
                    if (value.data) {
                        dispatch(loginUser(value.data));
                    } else {
                        alert("Username or Password wrong");
                    }
                });
        }
    }

    public render(): React.ReactNode {
        const { currentUser } = this.props;
        const { username, password } = this.state;

        return currentUser ? (
            <ContentBox activeItem="Login" style={{ textAlign: "center" }}>
                Succesfully Logged in!!!
            </ContentBox>
        ) : (
            <ContentBox activeItem="Login">
                <TextBox label="Username" value={username} onChange={this.onUsernameChange} />
                <TextBox type="password" label="Password" value={password} onChange={this.onPasswordChange} />
                <Button style={{ float: "right", marginRight: -3 }} onClick={this.onLoginClick}>Login</Button>
            </ContentBox>
        );
    }
}

const mapStateToProps = (store: any): ILoginStateProps => {
    return {
        currentUser: store.user
    };
}
export const $Login = connectComponent(mapStateToProps, Login);
