import Users from "../models/userModel.js";
import mongoose from "mongoose";
import { signToken } from "../utils/jwt.js";

const maxAge = 3 * 24 * 60 * 60;

// GET - all users
export const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(users);
};

// GET - single user
export const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tokio naudotojo nėra" });
  }
  const user = await Users.findById(id);
  if (!user) {
    return res.status(404).json({ error: "Tokio naudotojo nėra" });
  }
  res.status(200).json(user);
};

// POST - login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.login(email, password);
    const token = signToken(user._id, user.role);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ email: user.email, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST - signup user
export const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await Users.signup(email, password, username);
    const token = signToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(200)
      .json({ id: user._id, email: user.email, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - delete single user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tokio naudotojo nėra" });
  }
  const user = await Users.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "Tokio naudotojo nėra" });
  }
  res.status(200).json(user);
};

// PATCH - update single user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tokio naudotojo nėra" });
  }
  const user = await Users.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!user) {
    return res.status(404).json({ error: "Tokio naudotojo nėra" });
  }
  res.status(200).json(user);
};

// POST - logout user
export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.sendStatus(200);
};
