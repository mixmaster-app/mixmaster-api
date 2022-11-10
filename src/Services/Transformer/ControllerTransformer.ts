import { Controller } from "~/Utils/Controller";
import { Tag } from "~/Utils/Swagger/Tag";

export function ControllerToTag(controller: Controller): Tag {
    return (new Tag())
        .setName(controller.getName())
        .setDescription(controller.getDescription())
    ;
}