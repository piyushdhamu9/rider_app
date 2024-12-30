const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    experies: 86400, // Tokens are automatically removed after 24 hours
  },
});

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
