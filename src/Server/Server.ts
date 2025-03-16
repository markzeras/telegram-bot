import { createServer } from "http";
import {Router} from "~/Server/Router";


export const startServer = async (
    port: string,
    router: Router,
    ) => {
        const server = createServer(async (req, res) => {
            await router.handleRequest(req, res);
        });

        server.listen(port, () => {
            console.log(`🚀 Server is running at http://localhost:${port}`);
        });

        return server;
};
