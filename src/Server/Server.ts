import { createServer } from "http";
import {Router} from "~/Server/Router";
import {HttpContext} from "~/Types/httpContext";

export const startServer = async (
    port: string,
    router: Router,
    ) => {
        const server = createServer(async (req, res) => {
            const ctx = {req, res} as HttpContext;
            await router.handleRequest(ctx);
        });

        server.listen(port, () => {
            console.log(`🚀 Server is running at http://localhost:${port}`);
        });

        return server;
};
