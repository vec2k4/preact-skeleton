import { h, Component } from "preact";
import { Modal as BSModal } from "bootstrap.native";

export interface ModalProperties {
}

export interface ModalState {
}

export class Modal extends Component<ModalProperties, ModalState> {
    constructor(props: ModalProperties) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var myModal = document.getElementById('modalID');
        var myModalInstance = new BSModal(myModal);
        myModalInstance.show();

        setTimeout(() => {
            myModalInstance.setContent("Some new content");
            myModalInstance.update();
        }, 2000);
    }

    componentWillUnmount() {
    }

    render(props?: ModalProperties & preact.ComponentProps<this>, state?: ModalState, context?: any): JSX.Element {
        return (
            <div id="modalID" class="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        {this.content(props, state)}
                    </div>
                </div>
            </div>
        );
    }

    content = (props: ModalProperties, state: ModalState) => (
        <div class="modal-body">
            This is some modal content.
        </div>
    );
}