const express = require("express");

const authmiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController
} = require("../controller/restaurantController");

const router = express.Router();

// routes
// create resturant || post
router.post("/create", authmiddleware, createRestaurantController);
// get all restaurant || get
router.get("/getAll", getAllRestaurantController);
// get restaurant by id || get
router.get("/get/:id", getRestaurantByIdController);
// delete restaurant || delete
router.delete("/delete/:id", deleteRestaurantController)

module.exports = router;
