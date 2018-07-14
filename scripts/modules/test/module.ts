import restify from "restify"

export type Mod<T> = (input: any) => Promise<T>

export type Module = {
    method: "del" | "get" | "head" | "opts" | "post" | "put" | "patch",
    path: string | RegExp | restify.RouteOptions,
    handler: restify.RequestHandlerType
}

export type ModuleMessage = {
    status: number,
    message: string,
    content?: any
}

export function messageModule(path: string, data?: object): Promise<ModuleMessage> {
    return new Promise((resolve, reject) => {

    })
}
export function sendJson(res: restify.Response, status: number, message: string, content?: any) {
    let json: ModuleMessage = {
        status: status,
        message: message,
        content: content
    }

    res.status(status)
    res.json(json)
}