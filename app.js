const http = require("http");
const fs = require("fs");
import { handler } from "./route.js";
const server = http.createServer(handler);

server.listen(3000);
