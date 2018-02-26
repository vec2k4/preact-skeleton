import * as urljoin from "url-join";

export class AsyncFetch {
    static async fetchIndex() {
        try {
            const url = urljoin("http://localhost:8080", "index.html");
            const request = await fetch(url);
            const text = await request.text();
            console.log(text);
        } catch (err) {
            console.log("Error: ", err)
        }
    }
}