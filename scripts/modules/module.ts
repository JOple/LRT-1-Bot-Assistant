import restify from "restify"

export type Module = {
    method: "del" | "get" | "head" | "opts" | "post" | "put" | "patch",
    path: string | RegExp | restify.RouteOptions,
    handler: restify.RequestHandlerType
}