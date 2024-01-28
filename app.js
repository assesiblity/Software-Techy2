const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const methodOverride = require("method-override");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

// Connecting to DB
let MONGO_URL = "mongodb://localhost:27017/nexus"; //mongodb://localhost:27017
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("Connected To DB");
  })
  .catch((err) => {
    console.log(err);
  });

// creating customer schema
const customerSchema = Schema({
  name: String,
  email: String,
  password: String,
});
const Customer = mongoose.model("Customer", customerSchema);

app.get("/", (req, res) => {
  res.render("boilerplate.ejs");
});

app.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  let newCustomer = Customer({
    name,
    email,
    password,
  });
  let addedCustomer = await newCustomer.save();
  console.log(newCustomer);
  res.redirect("/");
});

// rating
app.get("/rating", (req, res) => {
  res.render("rating.ejs");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
