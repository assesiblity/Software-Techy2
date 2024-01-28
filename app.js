if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
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
// let MONGO_URL = "mongodb://100.20.92.101:27017/nexus"; //mongodb://localhost:27017
let dbUrl = `${process.env.CLOUD_DB_URL}`;
async function main() {
  await mongoose.connect(dbUrl);
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
  await Customer.insertOne({
    name,
    email,
    password,
  });
  res.redirect("/");
});

// rating
app.get("/rating", (req, res) => {
  res.render("rating.ejs");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
