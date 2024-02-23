//index.js
const express =require('express')
const  routes = require("./src/controllers")
const app = express();
const PORT = process.env.PORT || 3002;

app.use(routes())
app.get("/", (req:any, res:any) => {
  res.send("Hello, world! PieTECH DEV");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
