declare module "bootstrap.native" {
    class Dropdown {
        /**
        * This will show up in d.ts file
        * @param {Element} element - The menu button element for the drop-down menu.
        * @param {boolean} [persist=false] - Specifies whether the drop-down menu should remain open after a click. Default is false.
        */
        constructor(element: Element, persist?: boolean);

        /**
         * Toggles the drop-down menu.
         */
        toggle(): void;
    }
}

