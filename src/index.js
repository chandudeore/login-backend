const express = require("express");
const connect = require("./config/db");
require("dotenv").config();

const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");

const { register, login } = require("./controllers/auth.controller");
const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/users", userController);
app.use("/products", productController);

app.listen(process.env.PORT || 9999, async () => {
  try {
    await connect();
    console.log("listening on port 9999");
  } catch (e) {
    console.error(e.message);
  }
});
