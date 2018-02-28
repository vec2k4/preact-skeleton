import { h, Component } from "preact";
import { Modal as BSModal } from "bootstrap.native";

export interface ModalProps {
}

export interface ModalState {
    root: Element
}

export class Modal extends Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
    }

    componentDidMount() {
        var modal = new BSModal(this.state.root);
        modal.show();

        setTimeout(() => {
            modal.setContent("Some new content");
            modal.update();
        }, 2000);
    }

    componentWillUnmount() {
    }

    render(props: ModalProps, state: ModalState) {
        return (
            <div ref={this.setRoot} id="modalID" class="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        {this.content(props, state)}
                    </div>
                </div>
            </div>
        );
    }

    content = (_props: ModalProps, _state: ModalState) => (
        <div class="modal-body">
            This is some modal content.
        </div>
    );

    setRoot = (el: Element) => this.setState({ root: el });
}