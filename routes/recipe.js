
const router = require('express').Router()
const { createRecipe, fetchAllRecipe, deleteRecipe, search } = require('../controllers/recipe')

router.get("/get-recipes", fetchAllRecipe)
router.post("/create-recipe", createRecipe)
router.post("/delete-recipe", deleteRecipe)
router.post("/search-recipe", search)


module.exports = router