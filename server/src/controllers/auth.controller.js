import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the required field and creates a new user in MONGODB Database with userSchema
 * @access Public
 */
const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide all the required data.",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists with this Email or Username",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: passwordHash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.secretExpiry,
    },
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.jwt.refreshSecret,
    {
      expiresIn: config.jwt.refreshSecretExpiry,
    },
  );

  res.cookie("refreshToken", refreshToken);
  res.status(201).json({
    message: "User registered successfully!",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

/**
 * @name loginUserController
 * @description login an existing user, expects username or email, and password in the required field and checks availablity of the user in MONGODB Database to grant access
 * @access Public
 */
const loginUserController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.secretExpiry,
    },
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.jwt.refreshSecret,
    {
      expiresIn: config.jwt.refreshSecretExpiry,
    },
  );

  res.cookie("refreshToken", refreshToken);
  res.status(201).json({
    message: "User registered successfully!",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

const authControllers = {
  registerUserController,
  loginUserController,
};
export default authControllers;
