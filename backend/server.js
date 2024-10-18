const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const port = process.env.PORT;
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
    .then((con) => {
        console.log("Connected");
    })
    .catch((error) =>{
        console.log(error);
    });

app.listen(port, () => {
    console.log(`express Started; see http://localhost:${port}`)
})
