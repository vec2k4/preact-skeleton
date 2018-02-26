import * as tsnameof from "ts-nameof";

//import "bootstrap-css-only";
import "../styles/style.css";
import "../styles/style.scss";

import { h, render } from "preact";
import { Shell } from "./components/shell/shell";
import { AsyncFetch } from "./model/async-fetch";

AsyncFetch.fetchIndex().then(() => console.log(`${nameof<AsyncFetch>()} finished.`));

render(<Shell />, document.body);
