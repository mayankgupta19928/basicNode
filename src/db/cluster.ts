import cluster from "cluster";
import express from "express";

import os from "os";

console.log("Number of CPU cores:", os.cpus().length, cluster);

const clusterServer = (app: express.Application) => {
  if (cluster.isPrimary) {
    console.log("Primary process is running");
    const cpuCores = os.cpus().length;
    for (let i = 0; i < cpuCores; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    console.log("Worker process is running");
    // Here you can start your server
    // For example, if you are using Express:
    // const app = express();
    app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });
  }
};
export default clusterServer;
