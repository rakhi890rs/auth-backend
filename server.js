// Load env variables
require('dotenv').config();

// // Debugging logs
// console.log("Loaded MONGODB_URL:", process.env.MONGODB_URL);
// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

const app = require("./src/app");
const connectDB = require("./src/db/db");

// Connect to MongoDB
connectDB();

// Start server
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
