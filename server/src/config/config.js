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
  jwt: {
    secret: required("JWT_SECRET"),
    secretExpiry: required("JWT_EXPIRES_IN") || "10m",
    refreshSecret: required("REFRESH_JWT_SECRET"),
    refreshSecretExpiry: required("REFRESH_JWT_EXPIRES_IN") || "7d",
  },
  aiApi: required("GOOGLE_GEN_AI_KEY"),
};

export default config;
