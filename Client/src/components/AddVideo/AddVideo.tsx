import * as React from "react";
import { default as axios } from "axios";
import { User, IDropdownItem, IVideo, connectComponent } from "../../services";
import { ContentBox, TextBox, Dropdown, Button } from "../Common";

import "./AddVideo.scss";

interface IAddVideoOwnProps {
    match: any;
}
interface IAddVideoStateProps {
    currentUser: User;
}
interface IAddVideoState {
    name: string;
    description: string;
    genre: string;
    length: string;
    releaseDate: string;
}
type IAddVideoProps = IAddVideoOwnProps & IAddVideoStateProps;

export class AddVideo extends React.Component<IAddVideoProps, IAddVideoState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            description: "",
            genre: "Horror",
            length: "",
            releaseDate: ""
        };
    }

    private onNameChange = (name: string): void => this.setState({ name });

    private onDescriptionChange = (description: string): void => this.setState({ description });

    private onGenreChange = (genre: string): void => this.setState({ genre });

    private onLengthChange = (length: string): void => this.setState({ length });

    private onReleaseDateChange = (releaseDate: string): void  => this.setState({ releaseDate });

    private onAddClick = (): void => {
        const { match, currentUser } = this.props;
        const { name, description, genre, length, releaseDate } = this.state;
        const { seriesId } = match.params;

        if (name === undefined || name === null || name.trim() === "") {
            alert("You need to enter a name");
        } else if (length === undefined || length === null || length.trim() === "") {
            alert("You need to enter a length");
        } else if (!new RegExp("^\\d+$").test(length)) {
            alert("You need to enter a valid number in length");
        } else if (genre === undefined || genre === null || genre.trim() === "") {
            alert("You need to enter a genre");
        } else if (genre !== "Horror" && genre !== "Comedy" && genre !== "Thriller" && genre !== "Action") {
            alert("You need to enter a valid genre (Horror, Comedy, Thriller or Action)");
        } else if (releaseDate === undefined || releaseDate === null || releaseDate.trim() === "") {
            alert("You need to enter a release date");
        } else {
            axios.put(`http://localhost:5000/api/Video/${currentUser.id}`, { name, description, genre, seriesId, length: parseInt(length, 10), releaseDate: new Date(releaseDate) } as IVideo)
                .then(() => {
                    this.setState({ name: "", description: "", genre: "Horror", length: "" });

                    alert("Successfully added the video");
                });
        }
    }

    public render(): React.ReactNode {
        const { currentUser } = this.props;
        const { name, description, genre, length, releaseDate } = this.state;
        // Datasource for the dropdown
        const dataSource = [
            { text: "Horror", data: "Horror" },
            { text: "Comedy", data: "Comedy"},
            { text: "Thriller", data: "Thriller" },
            { text: "Action", data: "Action" }
        ] as IDropdownItem[];

        return currentUser && currentUser.isAdmin ? (
            <ContentBox activeItem="Series">
                <TextBox label="Video name" value={name} onChange={this.onNameChange} />
                <TextBox label="Description (Optional)" value={description} onChange={this.onDescriptionChange} />
                <Dropdown label="Genre" value={genre} dataSource={dataSource} onChange={this.onGenreChange} />
                <TextBox label="Length (in min)" type="number" value={length} onChange={this.onLengthChange} />
                <TextBox label="Release date" type="date" value={releaseDate} onChange={this.onReleaseDateChange} />
                <Button style={{ float: "right", marginRight: -3 }} onClick={this.onAddClick}>Add</Button>
            </ContentBox>
        ) : <ContentBox activeItem="Series">
                <div style={{ color: "red" }}>You are not allowed to add a video</div>
            </ContentBox>;
    }
}

const mapStateToProps = (store: any): IAddVideoStateProps => {
    return {
        currentUser: store.user
    };
};
export const $AddVideo = connectComponent(mapStateToProps, AddVideo);
