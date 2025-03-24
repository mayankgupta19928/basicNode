import cluster from "cluster";
import express from "express";

import os from "os";

const clusterServer = (
  app: express.Application,
  serverCb: (arg: any) => void
) => {
  if (cluster.isPrimary) {
    // console.log("Primary process is running", process.pid);
    const cpuCores = os.cpus().length;
    // for (let i = 0; i < cpuCores; i++) {
    cluster.fork();
    // }
    cluster.on("exit", (worker, code, signal) => {
      // console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    // console.log("Worker process is running", process.pid);
    // Here you can start your server
    // For example, if you are using Express:
    // const app = express();
    serverCb(app);
  }
};
export default clusterServer;
