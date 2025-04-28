import express, { Express } from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the QR Code Generator API" });
});

export default app;
