const cluster = require("cluster");
const os = require("os");
const server = require("./server");

const NUMBER_OF_CPUS = os.cpus().length

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running.`);

    for (let i = 0; i < NUMBER_OF_CPUS; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died.`);
    });
} else {
    server.start();
}
