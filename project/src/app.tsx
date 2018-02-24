import "../styles/style.css";
import * as nameof from "ts-nameof";


import { h, render } from "preact";
import { Shell } from "./components/shell/shell";

const appElement = document.createElement("div");
document.body.appendChild(appElement);

render(<Shell />, appElement);
