"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//index.js
var express_1 = require("express");
var routes = require("./src/controllers/index.ts");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3002;
app.use(routes());
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
