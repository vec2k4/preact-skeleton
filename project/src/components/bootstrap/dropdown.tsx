import { h, Component } from "preact";
import { Dropdown as BSDropdown, DropdownElement } from "bootstrap.native";

export interface DropdownItem {
    id?: string | number;
    name: string;
}

export class DropdownItem {
    constructor(name: string, id?: string | number) {
        this.name = name;
        this.id = id;
    }
}

export class DropdownDivider extends DropdownItem {
    constructor() {
        super(null);
    }
}

export interface DropdownProperties {
    items: DropdownItem[];
    onClick?: (item: DropdownItem) => void;
    onShow?: (event: CustomEvent) => void;
    onShown?: (event: CustomEvent) => void;
    onHide?: (event: CustomEvent) => void;
    onHidden?: (event: CustomEvent) => void;
}

interface DropdownState {
    root?: Element;
    button?: DropdownElement<Element>;
}

export class Dropdown extends Component<DropdownProperties, DropdownState> {
    private static readonly showEventType = "show.bs.dropdown";
    private static readonly shownEventType = "shown.bs.dropdown";
    private static readonly hideEventType = "hide.bs.dropdown";
    private static readonly hiddenEventType = "hidden.bs.dropdown";

    constructor(props: DropdownProperties) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const state = this.state;
        const dropdown = new BSDropdown(state.button);

         // Attach event handlers
        if (this.props.onShow) {
            state.root.addEventListener(Dropdown.showEventType, this.props.onShow, false);
        }
        if (this.props.onShown) {
            state.root.addEventListener(Dropdown.shownEventType, this.props.onShown, false);
        }
        if (this.props.onHide) {
            state.root.addEventListener(Dropdown.hideEventType, this.props.onHide, false);
        }
        if (this.props.onHidden) {
            state.root.addEventListener(Dropdown.hiddenEventType, this.props.onHidden, false);
        }
    }

    componentWillUnmount() {
        const state = this.state;

        // Detach event handlers
        if (this.props.onShow) {
            state.root.removeEventListener(Dropdown.showEventType, this.props.onShow, false);
        }
        if (this.props.onShown) {
            state.root.removeEventListener(Dropdown.shownEventType, this.props.onShown, false);
        }
        if (this.props.onHide) {
            state.root.removeEventListener(Dropdown.hideEventType, this.props.onHide, false);
        }
        if (this.props.onHidden) {
            state.root.removeEventListener(Dropdown.hiddenEventType, this.props.onHidden, false);
        }
    }

    render(props?: DropdownProperties & preact.ComponentProps<this>, state?: DropdownState, context?: any): JSX.Element {
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

    fillDropdown = (item: DropdownItem) => !item.name ? (<div class="dropdown-divider"></div>) : (<a class="dropdown-item" onClick={e => this.onClick(e, item)} href="#">{item.name}</a>);

    onClick = (ev: MouseEvent, item: DropdownItem) => {
        if (this.props.onClick) {
            ev.preventDefault();
            this.props.onClick(item);
        }
    }

    setRoot = (el: Element) => this.state.root = el;

    setButton = (el: Element) => this.state.button = el;
}