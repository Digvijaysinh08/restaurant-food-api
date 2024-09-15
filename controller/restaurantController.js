const restaurantModel = require("../model/restaurantModel");

// create reaturant
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imgurl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logUrl,
      rating,
      ratingCount,
      code,
      coords
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Title and address"
      });
    }
    // creat
    const newRestaurant = new restaurantModel({
      title,
      imgurl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logUrl,
      rating,
      ratingCount,
      code,
      coords
    });
    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New Reaturant Created Successfully",
      resturant: newRestaurant
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Reaturant API",
      error
    });
  }
};

// get all restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find({});
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Available"
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurant.length,
      restaurant
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Restaurant API",
      error
    });
  }
};

// get restaurant by id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Restaurant ID"
      });
    }
    // find restaurant
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found"
      });
    }
    res.status(200).send({
      success: true,
      restaurant
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurant By ID API",
      error
    });
  }
};
// delete restaurant
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if(!restaurantId){
      return res.status(400).send({
        success: false,
        message: "Please Provide Restaurant ID"
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error
    });
  }
}

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController
};
