import dotenv from "dotenv";
dotenv.config();

function required(name) {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV !== "test") {
    console.warn(`[config] Warning: environment variable ${name} is not set.`);
  }
  return value;
}

const config = {
  port: parseInt(required("PORT") || "5000"),
  dbUri: required("MONGO_URI"),
};

export default config;
