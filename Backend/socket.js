const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client Connected :${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (error) {
        console.error("Error updating socketId:", error);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client Disconnected :${socket.id}`);

      try {
        await userModel.updateMany(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
        await captainModel.updateMany(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
      } catch (error) {
        console.error("Error cleaning up socketId:", error);
      }
    });

    socket.on("message", (message) => {
      console.log("message", message);
      io.emit("message", message);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
