"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var routes = require("./src/controllers");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3002;
var corsOptions = {
    methods: ["GET, PUT, POST, DELETE"],
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 204, // * some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Create HTTP server
var server = http_1.default.createServer(app);
// Initialize socket.io with the HTTP server
var io = new socket_io_1.default.Server(server);
exports.io = io;
// Set the request size limit to 1 MB
app.use(body_parser_1.default.json({ limit: "1mb" }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsOptions));
// Define your routes
app.use(routes());
// Socket.IO connection handling
io.on('connection', function (socket) {
    console.log("\u26A1: ".concat(socket.id, " user just connected"));
    // Send a message to the connected client every 2 seconds
    // const interval = setInterval(() => {
    // const message = 'This is a message sent every 10 seconds';
    // console.log(`Message sent to ${socket.id}: ${message}`);
    // socket.emit('response', message);
    // }, 10000);
    socket.on('disconnect', function () {
        console.log('A user disconnected');
        // clearInterval(interval); 
    });
});
// Start the server
server.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
