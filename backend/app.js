const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");

//routes
app.use("/api/v1",User);

//creaeing port
app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`);
});
