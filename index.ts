//index.js
const express =require('express') 
// import { AppRoutes } from './src/controllers';
const app = express();
const PORT = process.env.PORT || 3002;

// app.use(AppRoutes())
app.get("/", (req:any, res:any) => {
  res.send("Hello, world! PieTECH DEV");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
