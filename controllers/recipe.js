const { measureMemory } = require("vm")
const RecipeModel = require("../models/recipe")
const fs = require("fs")

const recipe = fs.readFileSync("data.json", "utf-8")
const recipeData = JSON.parse(recipe)

exports.createRecipe = async (req, res) => {
    // console.log("uploading files");

    try {
        const { cuisine, name, imageURL, ingredients, instructions } = req.body
console.log(cuisine, name, imageURL, ingredients, instructions );

        if (!cuisine || !name || !imageURL || ingredients.length == 0 || instructions.length == 0) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        const recipeNameExists = await RecipeModel.findOne({ name })

        if (recipeNameExists) {
            return res.status(400).json({
                success: false,
                message: "Enter Unique Name"
            })
        }

        const newRecipe = await RecipeModel.create({
            cuisine, name, imageURL, ingredients, instructions
        })

        const allRecipes = await RecipeModel.find()

        res.status(200).json({
            success: true,
            message: "Recipe Added Successfully",
            newRecipe,
            allRecipes
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

    // try {
    //     for (const recipe of recipeData) {
    //         // console.log(mobile);

    //         const respone = await RecipeModel.create({
    //             cuisine: recipe.cuisine,
    //             name: recipe.name,
    //             imageURL: recipe.imageURL,
    //             ingredients: [...recipe.ingredients],
    //             instructions: [...recipe.instructions]
    //         })

    //         // console.log(res);
    //     }
    //     res.status(200).json({
    //         success: true,
    //         message: "DATA SEEDED SUCCESSFULLY"
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
}

exports.deleteRecipe = async (req, res) => {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Recipe Id Required"
            })
        }
        const deletedRecipe = await RecipeModel.findByIdAndDelete(_id)

        const allRecipes = await RecipeModel.find()

        res.status(200).json({
            success: true,
            message: "Recipe Deleted Successfully",
            deletedRecipe,
            allRecipes
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.fetchAllRecipe = async (req, res) => {
    try {
        const allRecipes = await RecipeModel.find()

        if (allRecipes.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Fetched All Recipes",
                recipes: allRecipes
            })
        } else {
            res.status(201).json({
                success: true,
                message: "No Recipe Available, Please Add."
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

exports.search = async (req, res) =>{
    try {
        const {name }  = req.body

        if(!name){
            return res.status(400).json({
                success: "false",
                message: "Enter Recipe name"
            })
        }

        const recipe = await RecipeModel.findOne({name: name})

        if(!recipe){
            return res.status(404).json({
                success: false,
                message: "Not Found",
                recipe: []
            })
        }

        res.status(200).json({
            success: true,
            message: "Success",
            recipe
        })
    } catch (error) {
        
    }
}