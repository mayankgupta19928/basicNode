import express, { Request, Response, NextFunction } from "express";
import { router } from "./route";
import { convertZip, readStreamFile } from "./controller/stream";
import { Worker } from "worker_threads";

import clusterServer from "./db/cluster";
// Define a custom error interface
interface CustomError extends Error {
  status?: number;
}

import cors from "cors";
// console.log(cluster);
// import status from "express-status-monitor";
const port = 8000;
const app = express();
import { connectmongoDb } from "./db/connection";
import { logMiddelware } from "./middelware";

import { Server } from "socket.io";
import { createServer } from "http";
import fs from "fs";

const server = createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("chat message", (msg, clientOffset) => {
    io.emit("message", msg);

    console.log("message: " + msg, clientOffset);
  });
});

fs.readFile(__filename, () => {});
setTimeout(() => {
  console.log("timeout check loop");
}, 0);
setImmediate(() => {
  console.log("immediate check loop");
});
app.use(express.urlencoded({ extended: true }));
app.use(logMiddelware());
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/custom-error", (req, res, next) => {
  const error = new Error("This is a custom error");
  (error as any).status = 400; // Custom status code
  next(error);
});
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: err.message || "Something broke!" });
});

// worker thread example
const worker = new Worker(
  `
  const { parentPort } = require("worker_threads");
  parentPort.postMessage("Hello from worker!");
`,
  { eval: true }
);

worker.on("message", (message) => {
  console.log("Received:", message);
});

// const express = require('express')

// const app = express()

// app.use((req, res, next) => {
//   console.log('First middlewear')
//   next()
// })
// app.use((req, res, next) => {
//   console.log('Second middlewear')
//   res.send('<p>Asignment done!</p>')
// })

// app.use("/user", (req, res, next) => {
//   res.send("<p>This is user page route</p>");
//   next();
// });
// app.use("/", (req, res, next) => {
//   console.log("First middlewear");
//   res.send("<p>This is home page route</p>");
//   next();
// });

// app.use(status());s

app.get("/download", (req: Request, res: Response, next: NextFunction) => {
  const readStream = fs.createReadStream("nonexistent-file.txt");

  readStream.on("error", (err) => {
    next(err); // Pass the error to Express error middleware
  });

  readStream.pipe(res);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error: Mayank", err.message);
  // throw new Error("Error in the app");
  res.status(500).json({ error: "Internal Server Error Mayank" });
});

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
