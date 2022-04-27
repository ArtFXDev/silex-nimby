import express, { Express, Request, Response } from "express";
import { NimbyStatusPost } from "./types";

const app: Express = express();

app.get("/nimby/status", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/nimby/status", (req: Request<{}, {}, NimbyStatusPost>, res: Response) => {
  res.send("hello world");
});

export function initAPI(port: number = 3000) {
  app.listen(port);
};
