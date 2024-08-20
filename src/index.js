import express from "express";
import { PORT } from "./config.js";
import { router } from "./routes/unicorn.route.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use((req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

app.listen(PORT, () => {
  console.log("server on port " + PORT);
});
