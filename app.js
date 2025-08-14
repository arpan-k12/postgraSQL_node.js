require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const authRoute = require("./route/authRoute");
const projectRoute = require("./route/projectRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();
app.use(express.json());

// all routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/projects", projectRoute);

app.use(
  catchAsync(async (req, res) => {
    throw new AppError(`can't find ${req.originalUrl} on this server`, 404);
    // res.status(404).json({
    //   status: "fail",
    //   message: "Route not found",
    // });
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log("APP is Runnig on port:", PORT);
});
