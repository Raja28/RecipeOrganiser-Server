const mongoose = require("mongoose")
require("dotenv").config()

exports.connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB)
        if (connection) {
            console.log("Recipe Organiser DB connected successfully");

        }
    } catch (error) {
        console.log("Error connecting to Recipe Organiser DB");
        throw error
    }
}