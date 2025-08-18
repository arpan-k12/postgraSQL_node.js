require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const authRoute = require("./route/authRoute");
const projectRoute = require("./route/projectRoute");
const userRoute = require("./route/userRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const { swaggerUi, swaggerSpec } = require("./swagger/swagger");

const app = express();
app.use(express.json());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// all routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/user", userRoute);

app.use(
  catchAsync(async (req, res) => {
    throw new AppError(`can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log("APP is Runnig on port:", PORT);
});
