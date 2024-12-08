const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
const { connectDB } = require("./config/database")

app.use(cors({
    origin: "*",
    credentials: true
}))

require("dotenv").config()

connectDB()
PORT = process.env.PORT || 2025

const recipeRouter = require("./routes/recipe")

app.use("/recipe", recipeRouter)

app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Recipe Organiser sever is up..."
    })
})

app.listen(PORT, () => {
    console.log("Recipe Organiser sever is up. PORT:", PORT);
})
