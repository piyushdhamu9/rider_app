const rideModel = require("../models/ride.model");
const mapService = require("./map.service");
const crypto = require("crypto");

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num) - 1)
      .toString();
    return otp;
  }

  return generateOtp(num);
}

async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination || !vehicleType) {
    throw new Error("Pickup, Destination, and Vehicle Type are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  //   console.log("Distance and Time:", distanceTime);

  const BASE_FARE = {
    car: 50,
    auto: 30,
    motorcycle: 20,
  };

  const RATE_PER_KM = {
    car: 15,
    auto: 10,
    motorcycle: 8,
  };

  const TIME_RATE = {
    car: 2,
    auto: 1.5,
    motorcycle: 1,
  };

  if (
    !BASE_FARE[vehicleType] ||
    !RATE_PER_KM[vehicleType] ||
    !TIME_RATE[vehicleType]
  ) {
    throw new Error("Invalid vehicle type");
  }

  const fare = Math.round(
    BASE_FARE[vehicleType] +
      distanceTime.distance * RATE_PER_KM[vehicleType] +
      distanceTime.duration * TIME_RATE[vehicleType]
  );

  //   console.log("Calculated Fare:", fare);

  return fare;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination, vehicleType);

  //   console.log("Fare for Ride:", fare);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare,
    vehicleType,
  });

  return ride;
};
