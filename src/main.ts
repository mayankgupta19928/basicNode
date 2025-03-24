import express, { Request, Response, NextFunction } from "express";
import { router } from "./route";
import { convertZip, readStreamFile } from "./controller/stream";
import clusterServer from "./db/cluster";

import cors from "cors";
// console.log(cluster);
// import status from "express-status-monitor";
const port = 8000;
const app = express();
import { connectmongoDb } from "./db/connection";
import { logMiddelware } from "./middelware";

import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("chat message", (msg, clientOffset) => {
    io.emit("message", msg, "2", { 3: "4", 5: Buffer.from([6]) });

    console.log("message: " + msg, clientOffset);
  });
});
app.use(express.urlencoded({ extended: true }));
app.use(logMiddelware());
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// app.use(status());
app.use("/", router);

// read file using fs
app.use("/readfile", readStreamFile);
app.use("/zipRead", convertZip);

//connect with mongodb
connectmongoDb();

clusterServer(app as express.Application, () =>
  server.listen(8000, () => {
    console.log(`Server is running on port 8000`);
  })
);
// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
