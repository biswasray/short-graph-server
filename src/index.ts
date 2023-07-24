import http from "http";
import express from "express";
import cors from "cors";
import "express-async-errors";
import path from "path";
import { ExpressErrorHandler } from "platform-error";
import logger from "./utils/logger";
import { roleRouter } from "./api/role";
import { userRouter } from "./api/user";

export const RootPath = __dirname;
const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/role", roleRouter);
app.use("/user", userRouter);

app.use("/assets", express.static(path.join(RootPath, "assets")));
app.use("/", express.static(path.join(RootPath, "public")));
app.all("*", (request, response) => {
  response.send("Running");
});

app.use(ExpressErrorHandler());

server.listen(process.env.PORT, () => {
  logger.info(`Listening...${process.env.PORT}`);
});
