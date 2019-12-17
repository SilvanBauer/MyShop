import * as React from "react";
import { default as axios } from "axios";
import { connectComponent, User, IUser, ISerie } from "../../services";
import { ContentBox, TextBox, Button } from "../Common";

import "./AddSeries.scss";

interface IAddSeriesStateProps {
    currentUser: User;
}
interface IAddSeriesState {
    seriesname: string;
}

export class AddSeries extends React.Component<IAddSeriesStateProps, IAddSeriesState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            seriesname: ""
        };
    }

    private onSeriesnameChange = (seriesname: string): void => this.setState({ seriesname });

    private onAddClick = (): void => {
        const { currentUser } = this.props;
        const { seriesname } = this.state;

        if (seriesname === undefined || seriesname === null || seriesname.trim() === "") {
            alert("You need to enter a series name");
        } else {
            axios.put(`http://localhost:5000/api/Serie/${currentUser.id}`, { name: seriesname } as ISerie)
                .then(() => {
                    this.setState({ seriesname: "" });

                    alert("Successfully added Series");
                });
        }
    }

    public render(): React.ReactNode {
        const { currentUser } = this.props;
        const { seriesname } = this.state;

        return currentUser && currentUser.isAdmin ? (
            <ContentBox activeItem="Series">
                <TextBox label="Series name" value={seriesname} onChange={this.onSeriesnameChange} />
                <Button style={{ float: "right", marginRight: -3 }} onClick={this.onAddClick}>Add</Button>
            </ContentBox>
        ) : <ContentBox activeItem="Series">
                <div style={{ color: "red" }}>You are not allowed to add a series</div>
            </ContentBox>;
    }
}

const mapStateToProps = (store: any): IAddSeriesStateProps => {
    return {
        currentUser: store.user
    };
};
export const $AddSerie = connectComponent(mapStateToProps, AddSeries);
