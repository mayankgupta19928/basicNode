const http = require("http");
const fs = require("fs");
import { routeHandler } from "./route.js";
const server = http.createServer(routeHandler);

server.listen(3000);
