import { h, Component } from "preact";
import { Dropdown, DropdownItem, DropdownDivider } from "../bootstrap/dropdown";
import { Modal } from "../bootstrap/modal";
import { Navigation } from "../bootstrap/navigation";

import * as smiley from "../../../images/smileys/smiley.png";
import * as like from "../../../svg/smiley.svg";
import LikeSVG from "../../../svg/smiley.inline.svg";

export interface ShellProperties {
}

interface ShellState {
    message: string;
    dropdownItems: DropdownItem[];
}

export class Shell extends Component<ShellProperties, ShellState> {
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

    render(_props: ShellProperties, state: ShellState) {
        return (
            <div>
                <custom-element custom_attribute="a custom element & attribute defined in typings/jsx" /> 
                <Navigation items={["item1"]} />
                <div class="container">
                    <p>
                        <span style="padding-left: 10px;">{state.message}</span>
                    </p>
                    <p>
                        <div>
                            <LikeSVG class="like" fill="black" style="vertical-align: middle;" />
                            <span style="padding-left: 10px;">&lt;== Inline-SVG with hover effect by style</span>
                        </div>
                    </p>
                    <p>
                        <img src={like} class="like" />
                        <span style="padding-left: 10px;">&lt;== File-SVG, hover effect by style not possible</span>
                    </p>
                    <p>
                        <img src={smiley} />
                        <span style="padding-left: 10px;">&lt;== File-PNG</span>
                    </p>

                    <Dropdown items={state.dropdownItems}
                        onClick={item => console.log("Click", item.name, item.id)}
                        onShow={e => console.log("DropDown Show: ", e)}>
                    </Dropdown>

                    <Modal>
                    </Modal>

                    {this.populatePage()}
                </div>
            </div>
        );
    }

    populatePage = () => {
        let elements: JSX.Element[] = [];
        for (let i = 0; i < 100; i++) {
            elements.push(<span>Item {i}<br /></span>);
        }
        return elements;
    }
}