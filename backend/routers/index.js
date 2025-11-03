const express = require("express");
const rootRouter = express.Router();

// Import sub-routers
const authRouter = require("./auth.router");
const userRouter = require("./user.routers");
const stationRouter = require("./station.routers");
const uploadRouter = require("./upload.router");
const addressRouter = require("./address.router");
const brandRouter = require("./brand.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");
const orderRouter = require("./order.router");
const adminRouter = require("./admin.router");

// Mount sub-routers
rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/uploads", uploadRouter);
rootRouter.use("/stations", stationRouter);
rootRouter.use("/addresses", addressRouter);
rootRouter.use("/brands", brandRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/admin", adminRouter);

module.exports = rootRouter;
