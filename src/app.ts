import express, { Application } from "express";

import router from "./router/bookApi";

const app: Application = express();


app.use(express.json());




app.use("/api/v1", router);

export default app
