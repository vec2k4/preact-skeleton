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
    onShown?: (event: CustomEvent) => void;
    onHide?: (event: CustomEvent) => void;
    onHidden?: (event: CustomEvent) => void;
}

interface DropDownState {
    dropdown?: Dropdown;
    root?: Element;
    button?: Element;
}

export class DropDown extends Component<DropDownProperties, DropDownState> {
    private static readonly showEventType = "show.bs.dropdown";
    private static readonly shownEventType = "shown.bs.dropdown";
    private static readonly hideEventType = "hide.bs.dropdown";
    private static readonly hiddenEventType = "hidden.bs.dropdown";

    constructor(props: DropDownProperties) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const state = this.state;
        state.dropdown = new Dropdown(state.button);

        // Attach event handlers
        if (this.props.onShow) {
            state.root.addEventListener(DropDown.showEventType, this.props.onShow, false);
        }
        if (this.props.onShown) {
            state.root.addEventListener(DropDown.shownEventType, this.props.onShown, false);
        }
        if (this.props.onHide) {
            state.root.addEventListener(DropDown.hideEventType, this.props.onHide, false);
        }
        if (this.props.onHidden) {
            state.root.addEventListener(DropDown.hiddenEventType, this.props.onHidden, false);
        }
    }

    componentWillUnmount() {
        const state = this.state;

        // Detach event handlers
        if (this.props.onShow) {
            state.root.removeEventListener(DropDown.showEventType, this.props.onShow, false);
        }
        if (this.props.onShown) {
            state.root.removeEventListener(DropDown.shownEventType, this.props.onShown, false);
        }
        if (this.props.onHide) {
            state.root.removeEventListener(DropDown.hideEventType, this.props.onHide, false);
        }
        if (this.props.onHidden) {
            state.root.removeEventListener(DropDown.hiddenEventType, this.props.onHidden, false);
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

    fillDropdown = (item: DropDownItem) => !item.name ? (<div class="dropdown-divider"></div>) : (<a class="dropdown-item" onClick={e => this.onClick(e, item)} href="#">{item.name}</a>);

    onClick = (ev: MouseEvent, item: DropDownItem) => {
        if (this.props.onClick) {
            ev.preventDefault();
            this.props.onClick(item);
        }
    }

    setRoot = (el: Element) => this.state.root = el;

    setButton = (el: Element) => this.state.button = el;
}