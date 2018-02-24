import { h, Component } from "preact";
import * as smiley from "../../../images/smileys/smiley.gif";
import * as like from "../../../svg/like.svg";

export interface ShellProperties {
}

interface ShellState {
    message: string;
}

export class Shell extends Component<ShellProperties, ShellState> {
    constructor(props: ShellProperties) {
        super(props);
        this.state = {
            message: `Starting ${nameof<Shell>()}...`
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
            <div>
                <p>
                    <img class="like" src={like} />
                    <span style="padding-left: 10px;">{state.message}</span>
                </p>
                <p>
                    <img src={smiley} />
                </p>
            </div>
        );
    }
}