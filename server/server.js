import config from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const port = config.port;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
  });
});
