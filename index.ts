//index.js
import express from 'express' 
import { getSites } from './services/sites';
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3002;

// Define a route for /site and use the getSites handler
app.get('/site', getSites);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
