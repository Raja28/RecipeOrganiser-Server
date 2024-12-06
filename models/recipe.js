const { default: mongoose } = require("mongoose");

const recipeSchema = new mongoose.Schema({
    cuisine: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        unique: true
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: [{
        type: String,
        required: true,
    }],
}, { timestamps: true })

const RecipeModel = mongoose.model("Recipe", recipeSchema)
module.exports = RecipeModel