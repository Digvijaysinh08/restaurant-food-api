const express = require("express");
const {
  getUsersController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteUserController
} = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes
// GET User || GET
router.get("/getUser", authMiddleware, getUsersController);
// update profile
router.put("/updateUser", authMiddleware, updateUserController);
// update  password
router.post("/updatePassword", authMiddleware, updateUserPasswordController);
// reset password
router.post("/resetPassword", authMiddleware, resetPasswordController);
// delete user profile
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);


module.exports = router;
