export enum Status {
    Ok = 200,
    BadInput = 400,
    NotFound = 404,
    CannotResolve = 409,
    InternalError = 500
}

export interface ModuleOutput<T> {
    status: Status
    message: string
    content?: T
    errorContent?: any
}

export type Module<I, O> = (input?: I) => Promise<O>

export default Module