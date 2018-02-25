export class AsyncFetch {
    static async fetchIndex() {
        try {
            var request = await fetch("http://localhost:8080/index.html");
            var text = await request.text();
            console.log(text);
        } catch (err) {
            console.log("Error: ", err)
        }
    }
}