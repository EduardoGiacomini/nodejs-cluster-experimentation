const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.host = "localhost";
        this.port = 3000;

        this._applyMiddlewares();
        this._applyRoutes();

        this.requests = 0;
    }

    start() {
        this.app.listen(this.port, this.host, () => {
            console.log(`Server started on http://${this.host}:${this.port}. Worker ${process.pid} started.`)
        })
    }

    _applyMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    _applyRoutes() {
        const router = express.Router()
        router.get("/", (request, response) => {
            this.requests++;
            response.send({
                worker: process.pid,
                request: this.requests
            });

            console.log({
                worker: process.pid,
                request: this.requests
            });
        });
        this.app.use(router);
    }
}

const server = new Server();
module.exports = server;
