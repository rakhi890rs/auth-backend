// require('dotenv').config()
require('dotenv').config();
console.log("Loaded MONGODB_URL:", process.env.MONGODB_URL); // test

const app = require("./src/app");
const connectDB = require("./src/db/db")

connectDB()
app.listen(3000,()=>{
    console.log("server is running")
})