class BlogRoute {
    id: number = 0;
    page: number = 0;
    name: string = "";

    constructor() {
        for (let prop in this) {
            console.log(prop, this[prop], typeof this[prop]);
        }
            
    }
}

interface RouteSegment {
    render(): string;

    match(segments: string[]): string[] | null;
}

class RouteSegmentHash implements RouteSegment {
    render() {
        return "#";
    }

    match(segments: string[]) {
        const [segment, ...rest] = segments;
        if (segment !== "#") {
            return null;
        }

        console.log("Found hash segment: " + segment + " Rest: " + rest);
        return rest;
    }

}

class RouteSegmentStatic implements RouteSegment {
    constructor(private _part: string) {
    }

    render() {
        return this._part;
    }

    match(segments: string[]) {
        const [segment, ...rest] = segments;
        if (segment !== this._part) {
            return null;
        }

        console.log("Found static segment: " + segment + " Rest: " + rest);
        return rest;
    }
}

// todo: review:
// - https://github.com/FrigoEU/typescript-safe-router
// - https://github.com/angryzor/typesafe-urls


class RouteSegmentArgument<T> implements RouteSegment {
    constructor(private _part: keyof T, private _args: T) {
    }

    render() {
        return ":" + this._part;
    }

    match(segments: string[]) {
        const [segment, ...rest] = segments;
        if (segment == null || segment === "") {
            return null;
        }

        const targetType = typeof this._args[this._part];
        console.log("Found argument segment: " + segment + " TargetType: " + targetType + " Rest: " + rest.join("/"));

        switch (targetType) {
            case "number":
                const number = Number(segment);
                if (isNaN(number)) {
                    console.log("INVALID!");
                    return null;
                }
                Object.assign(this._args, { [this._part]: number });
                return rest;
            case "string":
                Object.assign(this._args, { [this._part]: segment });
                return rest;
        }

        return null;
    }
}

export class Route<T> {
    private _parts: RouteSegment[];
    private _args: T;

    private constructor(args: T) {
        this._parts = [new RouteSegmentHash()];
        this._args = args;
    }

    static create<T>(type: new () => T) {
        return new Route<T>(new type());
    }

    static(segment: string) {
        this._parts.push(new RouteSegmentStatic(segment));
        return this;
    }

    arg(argument: keyof T) {
        this._parts.push(new RouteSegmentArgument(argument, this._args));
        return this;
    }

    render() {
        return this._parts.map(p => p.render()).join("/");
    }

    match(route: string) {
        let segments = route.split("/");
        for (const s of this._parts) {
            let rest = s.match(segments);
            if (rest == null) {
                return null;
            }
            segments = rest;
        }

        return this._args;
    }
}

export function run() {
    const route = Route.create(BlogRoute).static("blogs").arg("name").arg("id").static("page").arg("page");
    console.log(route.render());

    let match = route.match("#/blogs/vec2k4/1234/page/4");
    console.log("Match: ", match);
}


