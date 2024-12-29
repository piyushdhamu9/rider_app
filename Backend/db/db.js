const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => console.log(err));
}

module.exports = connectToDB;
