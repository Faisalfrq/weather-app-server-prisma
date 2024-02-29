import express, { Request, Response } from "express";
import http from "http";
import socketIO from "socket.io";
import bodyParser from "body-parser";

const routes = require("./src/controllers");

const app = express();
const PORT = process.env.PORT || 3002;

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io with the HTTP server
const io = new socketIO.Server(server);

// Set the request size limit to 1 MB
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Define your routes
app.use(routes());

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected`);

  // Send a message to the connected client every 2 seconds
  // const interval = setInterval(() => {
    // const message = 'This is a message sent every 10 seconds';
    // console.log(`Message sent to ${socket.id}: ${message}`);
    // socket.emit('response', message);
  // }, 10000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // clearInterval(interval); 
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { io };