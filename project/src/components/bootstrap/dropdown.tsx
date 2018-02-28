import { h, Component } from "preact";
import { Dropdown as BSDropdown, DropdownElement } from "bootstrap.native";

export interface DropdownItem {
    id?: string | number;
    name: string | null
}

export class DropdownItem {
    constructor(name: string | null, id?: string | number) {
        this.name = name;
        this.id = id;
    }
}

export class DropdownDivider extends DropdownItem {
    constructor() {
        super(null);
    }
}

export interface DropdownProps {
    items: DropdownItem[];
    onClick?: (item: DropdownItem) => void;
    onShow?: (event: CustomEvent) => void;
    onShown?: (event: CustomEvent) => void;
    onHide?: (event: CustomEvent) => void;
    onHidden?: (event: CustomEvent) => void;
}

interface DropdownState {
    root: Element;
    button: DropdownElement<Element>;
}

export class Dropdown extends Component<DropdownProps, DropdownState> {
    private static readonly ShowEventType = "show.bs.dropdown";
    private static readonly ShownEventType = "shown.bs.dropdown";
    private static readonly HideEventType = "hide.bs.dropdown";
    private static readonly HiddenEventType = "hidden.bs.dropdown";

    constructor(props: DropdownProps) {
        super(props);
    }

    componentDidMount() {
        const state = this.state;
        new BSDropdown(state.button);

         // Attach event handlers
        if (this.props.onShow) {
            state.root.addEventListener(Dropdown.ShowEventType, this.props.onShow, false);
        }
        if (this.props.onShown) {
            state.root.addEventListener(Dropdown.ShownEventType, this.props.onShown, false);
        }
        if (this.props.onHide) {
            state.root.addEventListener(Dropdown.HideEventType, this.props.onHide, false);
        }
        if (this.props.onHidden) {
            state.root.addEventListener(Dropdown.HiddenEventType, this.props.onHidden, false);
        }
    }

    componentWillUnmount() {
        const state = this.state;

        // Detach event handlers
        if (this.props.onShow) {
            state.root.removeEventListener(Dropdown.ShowEventType, this.props.onShow, false);
        }
        if (this.props.onShown) {
            state.root.removeEventListener(Dropdown.ShownEventType, this.props.onShown, false);
        }
        if (this.props.onHide) {
            state.root.removeEventListener(Dropdown.HideEventType, this.props.onHide, false);
        }
        if (this.props.onHidden) {
            state.root.removeEventListener(Dropdown.HiddenEventType, this.props.onHidden, false);
        }
    }

    render(props: DropdownProps & preact.ComponentProps<this>, state: DropdownState, _context?: any) {
        state.button = state.button;
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

    setRoot = (el: Element) => this.setState({ root: el });

    setButton = (el: Element) => this.setState({ button: el });
}