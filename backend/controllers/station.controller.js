const { Station } = require("../models");
const { Op } = require("sequelize");

// Create a new station
const createStation = async (req, res) => {
  try {
    const { name, address, province } = req.body;
    const newStation = await Station.create({ name, address, province });
    res.status(201).json(newStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stations with optional filtering by province
const getStations = async (req, res) => {
  try {
    const { province, name } = req.query;

    if (name) {
      const stations = await Station.findAll({
        where: {
          name: { [Op.like]: `%${name}%` },
        },
      });
      return res.status(200).json(stations);
    }

    if (province) {
      const whereClause = province
        ? { province: { [Op.like]: `%${province}%` } }
        : {};
      const stations = await Station.findAll({ where: whereClause });
      res.status(200).json(stations);
    }

    const stations = await Station.findAll();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single station by ID
const getStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a station by ID
const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, province } = req.body;
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    await station.update({ name, address, province });
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a station by ID
const deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    await station.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export controller functions
module.exports = {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
};
