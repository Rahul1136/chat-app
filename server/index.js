const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json())

app.use("/api/auth", userRoutes);

//mongodb Connection
mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Mongodb Connection Success")
}).catch((err) =>{
    console.error("mongodb connnection error", err);
})

//node connection
const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is up and running at port ${process.env.PORT}`)
})