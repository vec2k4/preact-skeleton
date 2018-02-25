import * as nameof from "ts-nameof";

import "bootstrap-css-only";
import "../styles/style.css";

import { h, render } from "preact";
import { Shell } from "./components/shell/shell";

render(<Shell />, document.body);
