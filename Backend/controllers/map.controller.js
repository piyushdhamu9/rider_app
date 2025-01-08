const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  // console.log(req.query);

  const errors = validationResult(req);

  // console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid Address" });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json({ coordinates });
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid Address" });
  }

  const { origin, destination } = req.query;

  try {
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json({ distanceTime });
  } catch (error) {
    res.status(404).json({ message: "Distance/Time not found" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  const { input } = req.query;

  try {
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(404).json({ message: "Suggestions not found" });
  }
};
