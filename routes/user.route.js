const express = require("express");
const {
  GetUser,
  CreateUser,
  Signin,
} = require("../controllers/usersController");
const {
  userValidation,
  validateSignUpUser,
  validateUserSignIn,
} = require("../validation/user");
const userRouter = express.Router();

userRouter.get("/", GetUser);
userRouter.post("/sign-up", validateSignUpUser, userValidation, CreateUser);
userRouter.post("/sign-in", validateUserSignIn, userValidation, Signin);

module.exports = userRouter;
