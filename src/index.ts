//index.js
import express from 'express' 
import { AppRoutes } from './controllers';
const app = express();
const PORT = process.env.PORT || 3002;

app.use(AppRoutes())

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
