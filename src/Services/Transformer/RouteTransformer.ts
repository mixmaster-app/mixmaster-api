import { Route } from "~/Utils/Route";
import { Operation } from "~/Utils/Swagger/Operation";
import { Path } from "~/Utils/Swagger/Path";

export function RouteToPath(route: Route, tag: string): Path {
    const path = new Path();

    const operation = (new Operation())
        .addtag(tag)
        .setSummary(route.getDescription())
        .setOperationId(route.getLabel())
        .setParameters(route.getParameters())
    ;

    path.addOperation(route.getType(), operation);

    return path;
}