const express = require("express")
const app = express()
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const commentRoutes = require("./routes/commentRoutes")
const questionRoutes = require("./routes/questionRoutes")

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes);
app.use("/questions", questionRoutes);

module.exports = app;