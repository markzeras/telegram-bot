import {IncomingMessage, ServerResponse} from "http";

export type HttpContext = {
    req: IncomingMessage,
    res: ServerResponse
}