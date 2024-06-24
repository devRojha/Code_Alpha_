const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors())
app.use(express.json());

// app.use("/api", mainRouter);


app.listen(3000, ()=>{console.log("Backend Online")});