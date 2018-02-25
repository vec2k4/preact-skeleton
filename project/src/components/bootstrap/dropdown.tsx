import { h, Component } from "preact";
import { Dropdown } from "bootstrap.native";

export interface DropDownItem {
    id?: string | number;
    name: string;
}

export class DropDownItem {
    constructor(name: string, id?: string | number) {
        this.name = name;
        this.id = id;
    }
}

export class DropDownDivider extends DropDownItem {
    constructor() {
        super(null);
    }
}

export interface DropDownProperties {
    items: DropDownItem[];
    onClick?: (item: DropDownItem) => void;
    onShow?: (event: CustomEvent) => void;
}

interface DropDownState {
    dropdown?: Dropdown;
    root?: Element;
    button?: Element;
}

export class DropDown extends Component<DropDownProperties, DropDownState> {
    constructor(props: DropDownProperties) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const state = this.state;
        state.dropdown = new Dropdown(state.button);

        // Attach event handlers
        if (this.props.onShow) {
            state.root.addEventListener("show.bs.dropdown", this.props.onShow, false);
        }
    }

    componentWillUnmount() {
        const state = this.state;

        // Detach event handlers
        if (this.props.onShow) {
            state.root.removeEventListener("show.bs.dropdown", this.props.onShow, false);
        }
    }

    render(props?: DropDownProperties & preact.ComponentProps<this>, state?: DropDownState, context?: any): JSX.Element {
        return (
            <div class="dropdown" ref={this.setRoot}>
                <button class="btn btn-secondary dropdown-toggle" type="button" ref={this.setButton} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    { props.items.map(this.fillDropdown) }
                </div>
            </div>
        );
    }

    fillDropdown = (item: DropDownItem) => !item.name ? (<div class="dropdown-divider"></div>) : (<a class="dropdown-item" onClick={e => this.props.onClick(item)} href="#">{item.name}</a>);

    setRoot = (el: Element) => this.state.root = el;

    setButton = (el: Element) => this.state.button = el;
}