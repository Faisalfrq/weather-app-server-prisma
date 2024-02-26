//index.js
var express = require("express");
var routes = require("./src/controllers/index.ts");
var app = express();
var PORT = process.env.PORT || 3002;
app.use(routes());
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
