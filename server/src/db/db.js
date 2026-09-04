import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri);
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
