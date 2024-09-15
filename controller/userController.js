const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

// GET user info
const getUsersController = async (req, res) => {
  try {
    // finduser
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    // hidden password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get user API",
      error
    });
  }
};

// update user
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    // update
    const { userName, phone, address } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User update successfully",
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Update user API",
      error
    });
  }
};

// update user password
const updateUserPasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    // get data from user
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old password and new password"
      });
    }
    // check user password | compare password
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid old Password"
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password update successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Update user password API",
      error
    });
  }
};
// reset password
const resetPasswordController = async (req, res) => {
  try {
    const {email, newpassword, answer} = req.body;
    if(!email || !newpassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fileds"
      });
    }
    const user = await userModel.findOne({email, answer});
    if(!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or invalid answer"
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset SUccessfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset password API",
      error
    });
  }
};

// delete user
const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your Account has been Deleted Successfully",
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete user API",
      error
    });
  }
};

module.exports = {
  getUsersController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteUserController
};
