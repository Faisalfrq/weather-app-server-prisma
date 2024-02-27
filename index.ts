//index.js
import bodyParser from "body-parser";
import express from "express";
const routes = require("./src/controllers")
const app = express();
const PORT = process.env.PORT || 3002;

// ? set the request size limit to 1 MB
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes())

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
