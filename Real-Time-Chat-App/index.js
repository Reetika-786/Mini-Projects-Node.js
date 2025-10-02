const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat message", ({ msg }) => {
    // send msg + senderId
    io.emit("chat message", { msg, senderId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(9000, () => {
  console.log("Server running on http://localhost:9000");
});
