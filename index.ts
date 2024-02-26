//index.js
import express from "express";
const routes = require("./src/controllers/index.ts")
const app = express();
const PORT = process.env.PORT || 3002;

app.use(routes())

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
