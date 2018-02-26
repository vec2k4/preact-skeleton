import { h, Component } from "preact";

export interface NavigationProperties {
    items: string[];
}

interface NavigationState {
}


export class Navigation extends Component<NavigationProperties, NavigationState> {
    constructor(props: NavigationProperties) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            var state = this.state;

            this.setState(state);
        }, 1000);
    }

    render(props: NavigationProperties, state: NavigationState) {
        return (
            <nav class="navbar navbar-dark bg-dark">
                <h1 class="navbar-brand mb-0">Navbar</h1>
            </nav>
        );
    }
}