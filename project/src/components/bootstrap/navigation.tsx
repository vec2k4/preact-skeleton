import { h, Component } from "preact";

export interface NavigationProps {
    items: string[];
}

interface NavigationState {
}


export class Navigation extends Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            var state = this.state;

            this.setState(state);
        }, 1000);
    }

    render(_props: NavigationProps, _state: NavigationState) {
        return (
            <nav class="navbar navbar-dark bg-dark">
                <h1 class="navbar-brand mb-0">Navbar</h1>
            </nav>
        );
    }
}