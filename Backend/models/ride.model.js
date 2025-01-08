const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
    minlength: 3,
  },
  destination: {
    type: String,
    required: true,
    minlength: 3,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Ongoing", "Completed", "Cancelled"],
    default: "Pending",
  },
  duration: {
    type: Number,
    // in seconds
  },
  distance: {
    type: Number,
    // in meters
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: Number,
    required: true,
    select: false,
  },
});

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;
