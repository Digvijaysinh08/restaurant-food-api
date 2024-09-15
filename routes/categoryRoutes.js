const express = require("express");

const authmiddleware = require("../middlewares/authMiddleware");
const {
  createcategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController
} = require("../controller/categoryController");

const router = express.Router();

// routes
// create categories
router.post("/create", authmiddleware, createcategoryController);
// get all categories
router.get("/getAll", getAllCategoryController);
// update categories
router.put("/update/:id", updateCategoryController);
// delete categories
router.delete("/delete/:id", deleteCategoryController);


module.exports = router;
