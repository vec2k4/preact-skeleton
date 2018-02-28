// @ts-ignore: sad
import * as tsnameof from "ts-nameof";

import "bootstrap/scss/bootstrap.scss"; // https://getbootstrap.com/docs/4.0/getting-started/introduction/
import "../styles/style.css";
import "../styles/style.scss";

import { h, render } from "preact";
import { Shell } from "./components/shell/shell";
//import { AsyncFetch } from "./model/async-fetch";
import { run } from "./utils/router";

//AsyncFetch.fetchIndex().then(() => console.log(`${nameof<AsyncFetch>()} finished.`));
run();

console.log(document.location.hash);


render(<Shell />, document.body);
