const fs = require("fs");
import { Request, Response, NextFunction } from "express";
export function logMiddelware() {
  return (req: Request, res: Response, next: NextFunction) => {
    fs.appendFile(
      "log.txt",
      `\n ${Date.now()}:${req.ip}:${req.method}:${req.path}`,
      (err: Object) => {
        next();
        if (err) {
          console.error("Failed to write to log file:", err);
        }
      }
    );
    console.log("Middleware 1");
  };
}
