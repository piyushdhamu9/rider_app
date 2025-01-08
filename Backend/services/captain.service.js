const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
}) => {
  // Validate personal information
  if (!fullname?.firstname || !email || !password) {
    throw new Error("Personal information fields are required");
  }

  // Validate vehicle information
  if (
    !vehicle?.color ||
    !vehicle?.vehicleType ||
    !vehicle?.plateNumber ||
    !vehicle?.capacity
  ) {
    throw new Error("Vehicle information fields are required");
  }

  // Validate vehicle type
  if (!["car", "motorcycle", "auto"].includes(vehicle.vehicleType)) {
    throw new Error("Invalid vehicle type");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      vehicleType: vehicle.vehicleType,
      plateNumber: vehicle.plateNumber,
      capacity: vehicle.capacity,
    },
  });

  return captain;
};
