const categoryModel = require("../model/categoryModel");

// create category
const createcategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Title and Image URL"
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.send({
      success: true,
      message: "Category Created Successfully",
      category: newCategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error
    });
  }
};
// get all category
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Category Found"
      });
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Category API",
      error
    });
  }
};
// update category
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found"
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category API",
      error
    });
  }
};
// delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Category ID"
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      {
        return res.status(404).send({
          success: false,
          message: "Category not found"
        });
      }
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error
    });
  }
};

module.exports = {
  createcategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController
};
