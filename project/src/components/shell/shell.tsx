import { h, Component } from "preact";
import { Dropdown, DropdownItem, DropdownDivider } from "../bootstrap/dropdown";
import { Modal } from "../bootstrap/modal";

import * as smiley from "../../../images/smileys/smiley.gif";
import * as like from "../../../svg/like.svg";

export interface ShellProperties {
}

interface ShellState {
    message: string;
    dropdownItems: DropdownItem[];
}

export class Shell extends Component<ShellProperties, ShellState> {
    private dropdownItems: string[];

    constructor(props: ShellProperties) {
        super(props);
        this.state = {
            message: `Starting ${nameof<Shell>()}...`,
            dropdownItems: [
                new DropdownItem("1st", 1),
                new DropdownItem("2nd", 2),
                new DropdownItem("3rd", 3),
                new DropdownDivider(),
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

                <Dropdown items={state.dropdownItems}
                    onClick={item => console.log("Click", item.name, item.id)}
                    onShow={e => console.log("DropDown Show: ", e)}>
                </Dropdown>

                <Modal>
                </Modal>
            </div>
        );
    }
}