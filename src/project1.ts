import express, { Request, Response, NextFunction } from "express";
import { router } from "./route";
import { convertZip, readStreamFile } from "./controller/stream";
import clusterServer from "./db/cluster";

// console.log(cluster);
import status from "express-status-monitor";
const port = 8000;
const app = express();
import { connectmongoDb } from "./db/connection";
import { logMiddelware } from "./middelware";

app.use(express.urlencoded({ extended: true }));
app.use(logMiddelware());
app.use(status());
app.use("/", router);

// read file using fs
app.use("/readfile", readStreamFile);
app.use("/zipRead", convertZip);

//connect with mongodb
connectmongoDb();

clusterServer(app as express.Application);
// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
