import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import config from "./config";
import errorHandler from "./middleware/errorHandler";
import fourOhFour from "./middleware/fourOhFour";
import root from "./routes/root";
import dbInit from "./database/dbInit";
import admin from "./routes/admin";
import driver from "./routes/driver";
import order from "./routes/order";
import assignment from "./routes/assignment";
import truck from "./routes/truck";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.clientOrigins[config.nodeEnv],
  })
);

app.use(helmet());
app.use(morgan("tiny"));

// initiate database
dbInit();

// Apply routes before error handling
app.use("/", root);
app.use("/admin", admin);
app.use("/driver", driver);
app.use("/order", order);
app.use("/assignment", assignment);
app.use("/truck", truck);

// Apply error handling last
app.use(fourOhFour);
app.use(errorHandler);

export default app;
