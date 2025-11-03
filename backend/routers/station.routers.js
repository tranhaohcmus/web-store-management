const express = require("express");
const stationRouter = express.Router();
const {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/station.controller");

// Import the Station model
const { Station } = require("../models");

// Import middleware to check if a station exists
const checkExist = require("../middlewares/validations/checkExist");
const { authorize } = require("../middlewares/auth/authorize");
const { authenticate } = require("../middlewares/auth/authenticate");

// Create a new station
stationRouter.post("/", authenticate, authorize(["admin"]), createStation);

// Get all stations with optional filtering by province or name
stationRouter.get("/", getStations);

// Get a single station by ID
stationRouter.get("/:id", getStationById);

// Update a station by ID
stationRouter.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  checkExist(Station),
  updateStation
);

// Delete a station by ID
stationRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  checkExist(Station),
  deleteStation
);

module.exports = stationRouter;
