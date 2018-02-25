import { h, Component } from "preact";
import { DropDown, DropDownItem, DropDownDivider } from "../bootstrap/dropdown";

import * as smiley from "../../../images/smileys/smiley.gif";
import * as like from "../../../svg/like.svg";

export interface ShellProperties {
}

interface ShellState {
    message: string;
    dropdownItems: DropDownItem[];
}

export class Shell extends Component<ShellProperties, ShellState> {
    private dropdownItems: string[];

    constructor(props: ShellProperties) {
        super(props);
        this.state = {
            message: `Starting ${nameof<Shell>()}...`,
            dropdownItems: [
                new DropDownItem("1st", 1),
                new DropDownItem("2nd", 2),
                new DropDownItem("3rd", 3),
                new DropDownDivider(),
                { name: "4th" },
                { name: "5th" }]
        };
    }

    componentDidMount() {
        setTimeout(() => {
            var state = this.state;
            state.message = "Hello World from Preact with styles, fonts, images and svgs!"
            this.setState(state);
        }, 1000);
    }

    render(props: ShellProperties, state: ShellState) {
        return (
            <div class="container">
                <p>
                    <img class="like" src={like} />
                    <span style="padding-left: 10px;">{state.message}</span>
                </p>
                <p>
                    <img src={smiley} />
                </p>

                <DropDown items={state.dropdownItems}
                    onClick={item => console.log("Click", item.name, item.id)}
                    onShow={e => console.log("DropDown Show: ", e)}>
                </DropDown>
            </div>
        );
    }
}