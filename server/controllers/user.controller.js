import User from "../models/user.models.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error, failed to fetch users" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id format",
    });
  }

  try {
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error, failed to fetch user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id format",
    });
  }

  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error, failed to delete user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id format",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error, failed to delete user" });
  }
};
