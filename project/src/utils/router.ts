
//export type RouteSection<T> = string | Partial<T>;

//export class Route<T> {
//    constructor(...sections: RouteSection<T>[]) {
//        for (let part of sections) {
//            console.log(part);
//        }
//    }
//}

//type BlogRouteArgs = { id: number, page: number };

//let route = (p: BlogRouteArgs) => new Route<BlogRouteArgs>("/blogs", { id: p.id }, "page", { page: p.page })

//type SectionSetter<T> = (route: T, section: Partial<T>) => T;
//function makeRoute<T>(...sections: (string | SectionSetter<T>)[]) {

//}


//function arg<T>(prop: keyof T) {
//    return function setArg<T>(routeObj: T, sectionObj: Partial<T>): T {
//        return Object.assign(routeObj, sectionObj);
//    }
//}

//makeRoute<BlogRouteArgs>("/blogs", arg<BlogRouteArgs>("id"), "page", arg("page"));

class BlogRouteArgs {
    id: number = 0;
    page: number = 0;
}

enum RouteSegmentType {
    Static,
    Argument
}

interface RouteSegment<T> {
    part: string | keyof T;

    render(): string;

    match(segments: string[]): string[];
}

class RouteSegmentStatic<T> implements RouteSegment<T> {
    part: string;

    constructor(part: string) {
        this.part = part;
    }

    render() {
        return this.part;
    }

    match(segments: string[]) {
        const [segment, ...rest] = segments;
        if (segment !== this.part) {
            return null;
        }

        console.log("Found static segment: " + segment + " Rest: " + rest);
        return rest;
    }
}

// todo: review:
// - https://github.com/FrigoEU/typescript-safe-router
// - https://github.com/angryzor/typesafe-urls


class RouteSegmentNumberArgument<T> implements RouteSegment<T> {
    part: keyof T;

    private _args: T;

    constructor(part: keyof T, args: T) {
        this.part = part;
        this._args = args;
    }

    render() {
        return ":" + this.part;
    }

    match(segments: string[]) {
        const [segment, ...rest] = segments;
        console.log("Found argument segment: " + segment + " Rest: " + rest.join("/"));

        const number = Number(segment);
        if (isNaN(number)) {
            console.log("INVALID!");
            return null;
        }

        // todo: general solution for argument using the following:
        // if (value === "")
        //     return "";
        // 
        // const val = value.toLowerCase();
        // switch (val) {
        //     case "true":
        //         return true;
        //     case "false":
        //         return false;
        // }
        // 
        // const number = Number(value);
        // if (isNaN(number))
        //     return value;
        // 
        // return number;


        //let type = typeof this._args[this.part];
        //console.log(type, typeof segment);

        Object.assign(this._args, { [this.part]: segment });
        return rest;
    }
}

export class Route<T> {
    private _parts: RouteSegment<T>[];
    private _args: T;

    private constructor(args: T) {
        this._parts = [];
        this._args = args;
    }

    static create<T>(type: new () => T) {
        return new Route<T>(new type());
    }

    static(segment: string) {
        this._parts.push(new RouteSegmentStatic(segment));
        return this;
    }

    number(argument: keyof T) {
        this._parts.push(new RouteSegmentNumberArgument(argument, this._args));
        return this;
    }

    render() {
        return this._parts.map(p => p.render()).join("/");
    }

    match(route: string) {
        // todo: remove #/ as starter (maybe configurable)
        let segments = route.split("/");
        for (const s of this._parts) {
            segments = s.match(segments);
            if (segments === null) {
                return null;
            }
        }

        return this._args;
    }
}

export function run() {
    const route = Route.create(BlogRouteArgs).static("blogs").number("id").static("page").number("page");
    console.log(route.render());

    let match = route.match("blogs/12a3/page/4");
    console.log("Match: ", match);
}


