import Fs from "fs";
import zLib from "zlib";
import { Request, Response } from "express";

export const readFile = (req: Request, res: Response) => {
  Fs.readFile(
    "log.txt",
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error(err);
        return;
      }
      res.end(data);
    }
  );
};

export const readStreamFile = (req: Request, res: Response) => {
  const stream = Fs.createReadStream("log.txt", "utf8");
  stream.on("data", (data) => {
    res.write(data);
  });
  stream.on("end", () => {
    res.end();
  });
};

export const convertZip = (req: Request, res: Response) => {
  Fs.createReadStream("log.txt", "utf8").pipe(
    zLib.createGzip().pipe(Fs.createWriteStream("log.zip"))
  );
  console.log("File compressed");
  res.end("File compressed");
};
