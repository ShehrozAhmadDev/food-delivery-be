import express, { Express } from "express";
import apiRoutes from "./routes/routes";
import http from "http";
import config from "./config";
import database from "./database";
import { blue, bold, yellow } from "colors";

const app: Express = express();
const PORT: number = parseInt(config.PORT as string, 10);

const server = http.createServer(app);

//Initialize Routes
app.use("/api", apiRoutes);

//Database Connection
database();

//Listening to PORT
server.listen(PORT, (): void =>
  console.log(`${blue("Server Running On PORT: ")} ${bold(
    blue(`${config.PORT}`)
  )}
${yellow("API URL: ")} ${blue(`http://localhost:${config.PORT}/api`)}`)
);
