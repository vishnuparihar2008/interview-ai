import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blackListTokenModel from "../models/blacklist.model.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided.",
    });
  }

  const isTokenBlacklisted = await blackListTokenModel.findOne({
    token,
  });
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Token is invalid.",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default {
  authUser,
};
