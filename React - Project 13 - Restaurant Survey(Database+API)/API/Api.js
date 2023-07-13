const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//middleware that parses the request and a JavaScript object
const bodyParser = require("body-parser");
//allowing controlled access to resources
const cors = require("cors");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

//MongoDB moongoose schema for restaurants collections
const restaurantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurantName: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  logoURL: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 300,
  },
});

//MongoDB moongoose schema for surveys collections
const surveySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurant: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  rating: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 300,
  },
  review: {
    type: String,
    require: false,
    trim: true,
    minLength: 1,
    maxLenghth: 500,
  },
});

// Post function to add restaurant
app.post("/api/NewRestaurant", async (req, res) => {
  try {
    //await mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });
    await mongoose.connect(
      "mongodb+srv://ironmen101:cOO6XAnbd3fqxHQN@cluster0.4deejam.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );

    const db = mongoose.connection.useDb("Restaurants");

    const { restaurantName, logoURL } = req.body;

    const restaurant = db.model("Restaurant", restaurantSchema);

    const newRestaurant = restaurant({
      _id: new mongoose.Types.ObjectId(),
      restaurantName,
      logoURL,
    });

    // Adding records do database
    await newRestaurant.save();
    mongoose.connection.close();
    res.json({ success: true });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false });
  }
});

// Post function to add survey
app.post("/api/NewSurvey", async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://ironmen101:cOO6XAnbd3fqxHQN@cluster0.4deejam.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );

    const db = mongoose.connection.useDb("Restaurants");

    const { restaurant, rating, review } = req.body;

    const survey = db.model("Survey", surveySchema);

    const newSurvey = survey({
      _id: new mongoose.Types.ObjectId(),
      restaurant,
      rating,
      review,
    });

    // Adding records do database
    await newSurvey.save();
    mongoose.connection.close();
    res.json({ success: true });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false });
  }
});

// API Endpoint return list of restaurants
app.get("/api/RestaurantsList", async (req, res) => {
  try {
    const url =
      "mongodb+srv://ironmen101:cOO6XAnbd3fqxHQN@cluster0.4deejam.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("Restaurants");
    const collectionData = db.collection("restaurants");

    // Read only restaurantName and logoURL fields
    const documents = await collectionData
      .find({}, { projection: { _id: 0, restaurantName: 1, logoURL: 1 } })
      .toArray();

    const result = documents.map((doc) => {
      return {
        restaurantName: doc.restaurantName,
        logoURL: doc.logoURL,
      };
    });

    console.log("Collection: ", result);

    res.json(result);
    client.close();
  } catch (err) {
    console.error("Error fetching collection:", err);
    res.status(500).json({ error: "Error fetching collection:" });
  }
});

// Server start-up
app.listen(port, () => {
  console.log(`Express.js server is listening on the port ${port}`);
});
