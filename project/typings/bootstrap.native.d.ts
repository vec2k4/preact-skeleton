declare module "bootstrap.native" {

    // --- Dropdown

    type DropdownElement<T> = T & { Dropdown?: Dropdown };

    class Dropdown {
        /**
        * Creates the drop-down element.
        * @param {Element} element - The menu button element for the drop-down menu.
        * @param {boolean} [persist=false] - Specifies whether the drop-down menu should remain open after a click. Default is false.
        */
        constructor(element: Element, persist?: boolean);

        /**
         * Toggles the drop-down menu.
         */
        toggle(): void;
    }

    // --- Modal

    interface ModalOptions {
        /**
         * If true, shows backdrop and closes modal by mouse click. If false, doesn't show backdrop
         * and closes by mouse click. If "static", shows backdrop without mouse interaction.
         * Default is true.
         */
        backdrop?: boolean | "static";

        /**
         * If true, closes modal by escape key press. If false, does not react on keyboard events.
         * Default is true.
         */
        keyboard?: boolean;

        /**
         * Puts the focus on the modal when initialized.
         * Default is true.
         */
        focus?: boolean;

        /**
         * Shows the modal when initialized.
         * Default is true.
         */
        show?: boolean;
    }

    class Modal {
        /**
         * Creates the modal.
         * @param {Element} element - The modal root element.
         * @param {ModalOptions} [options] - The initialization options.
         * @param {boolean | "static"} [options.backdrop] - Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.
         * @param {boolean} [options.keyboard] - Closes the modal when escape key is pressed.
         * @param {boolean} [options.focus] - Puts the focus on the modal when initialized.
         * @param {boolean} [options.show] - Shows the modal when initialized.
         */
        constructor(element: Element, options?: ModalOptions);

        show(): void;

        hide(): void;

        toggle(): void;

        setContent(content: string): void;

        update(): void;
    }
}

