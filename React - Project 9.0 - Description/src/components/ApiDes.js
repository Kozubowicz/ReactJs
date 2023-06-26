import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ApiDes() {
  const code = `
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

//middleware that parses the request and a JavaScript object
const bodyParser = require("body-parser");

//allowing controlled access to resources
const cors = require("cors");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

//MongoDB moongoose schema for selected collections
const carSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  name: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  year: {
    type: Number,
    validate: {
      validator: function (value) {
        return Number.isInteger(value) && value.toString().length === 4;
      },
    },
    required: true,
  },
  engine: {
    type: Number,
    require: true,
    max: 10,
  },
  data: {
    type: String,
    require: false,
    trim: true,
    default: "---",
    maxLenghth: 255,
  },
});

const telephoneSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  name: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  color: {
    type: String,
    require: false,
    enum: ["red", "yellow", "green", "black", "silver", "white", "gold"],
  },
  age: {
    type: Number,
    required: false,
    default: 0,
    validate: {
      validator: function (v) {
        return v === null || v >= 0;
      },
      message: "Age can't be negative",
    },
    set: function (v) {
      if (v === null || v === undefined || v === "") {
        return 0;
      }
      return v;
    },
  },

  created: {
    type: Date,
    default: Date.now,
  },
});


//Post function allowind to add and remove objects from collection
app.post("/api/sendData", async (req, res) => {
  const { action } = req.body;
  const { dataBase, collection } = req.body;

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });

    if (action === "add") {
      const { newRekord } = req.body;
      const db = mongoose.connection.useDb(dataBase);

      if (collection === "telephones") {
        const telephone = db.model("Telephone", telephoneSchema);
        const newTelephone = new telephone({ _id: new mongoose.Types.ObjectId(), ...newRekord });
        await newTelephone.save();
      } else if (collection === "cars") {
        const car = db.model("Car", carSchema);
        const newCar = new car({ _id: new mongoose.Types.ObjectId(), ...newRekord });
        await newCar.save();
      } else {
        const customCollection = db.collection(collection);
        await customCollection.insertOne(newRekord);
      }
    } else if (action === "remove") {
      const db = mongoose.connection.useDb(dataBase);
      const { id } = req.body;

      const customCollection = db.collection(collection);
      await customCollection.deleteOne({ _id: new ObjectId(id) });
    }

    mongoose.connection.close();
    res.json({ success: true });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false });
  }
});

//API Endpoint return list of databases
app.get("/api/databases", async (req, res) => {
  try {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect();

    let databasesNames = [];
    const dblist = await client.db().admin().listDatabases();

    // List of excluded names
    const excludedNames = ["admin", "config", "local"];
    dblist.databases.forEach((db) => {
      if (!excludedNames.includes(db.name)) {
        databasesNames.push(db.name);
      }
    });
    console.log("Databases:", databasesNames);
    res.json(databasesNames);

    client.close();
  } catch (err) {
    console.error("Error fetching list of databases: ", err);
    res.status(500).json({ error: "Error fetching list of databases" });
  }
});

//API Endpoint return collections
app.get("/api/dataBase/:databaseName", async (req, res) => {
  try {
    const databaseName = req.params.databaseName;

    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(databaseName);
    const collections = await db.listCollections().toArray();

    const Coll = [];

    for (const collection of collections) {
      const collectionData = db.collection(collection.name);

      // Read all documents in the collection
      const documents = await collectionData.find({}).toArray();

      //Fetch of collections
      const obj = { name: collection.name, objArr: [] };
      documents.forEach((document) => {
        obj.objArr.push(document);
      });

      Coll.push(obj);
    }
    console.log("Collections: ", Coll);
    res.json(Coll);

    client.close();
  } catch (err) {
    console.error("Error fetching collections:", err);
    res.status(500).json({ error: "Error fetching collections:" });
  }
});

// Server start-up
app.listen(port, () => {
  console.log(Express.js server is listening on the port port);
})`;

  return (
    <div>
      <SyntaxHighlighter language="javascript" style={dracula}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
