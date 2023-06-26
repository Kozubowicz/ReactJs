const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

// Middleware JSON
app.use(bodyParser.json());
app.use(cors());
const teacherSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  surname: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
});

const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  surname: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  class: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
});

const gradeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  teacherId: {
    type: String,
    require: true,
    trim: true,
    minLength: 20,
    maxLenghth: 30,
  },
  studentId: {
    type: String,
    require: true,
    trim: true,
    minLength: 20,
    maxLenghth: 30,
  },
  subject: {
    type: String,
    require: true,
    trim: true,
    minLength: 1,
    maxLenghth: 24,
  },
  grade: {
    type: Number,
    required: false,
    default: 0,
    validate: {
      validator: function (v) {
        return v >= 1 && v <= 6;
      },
    },
    set: function (v) {
      if (v === null || v === undefined || v === "") {
        return 0;
      }
      return v;
    },
  },
});
app.post("/api/Exam", async (req, res) => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });

    const db = mongoose.connection.useDb("school");

    const newRecords = req.body;
    console.log(newRecords);
    const grade = db.model("Grade", gradeSchema);
    const newGrades = newRecords.map((record) => ({
      _id: new mongoose.Types.ObjectId(),
      ...record,
    }));
    await grade.insertMany(newGrades);
    mongoose.connection.close();
    res.json({ success: true });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false });
  }
});

app.post("/api/sendData", async (req, res) => {
  const { action } = req.body;
  const { collection } = req.body;

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });

    const db = mongoose.connection.useDb("school");
    if (action === "add") {
      const { newRekord } = req.body;

      if (collection === "students") {
        const student = db.model("Student", studentSchema);
        const NewStudent = new student({ _id: new mongoose.Types.ObjectId(), ...newRekord });
        await NewStudent.save();
      } else if (collection === "teachers") {
        const teacher = db.model("Teachers", teacherSchema);
        const NewTeacher = new teacher({ _id: new mongoose.Types.ObjectId(), ...newRekord });
        await NewTeacher.save();
      } else if (collection === "graders") {
        const grade = db.model("Grade", gradeSchema);
        const NewGrade = new grade({ _id: new mongoose.Types.ObjectId(), ...newRekord });
        await NewGrade.save();
      } else {
        const customCollection = db.collection(collection);
        await customCollection.insertOne(newRekord);
      }
    } else if (action === "remove") {
      //const db = mongoose.connection.useDb(dataBase);
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

//API Endpoint return school all collections

app.get("/api/school/List_all_data", async (req, res) => {
  try {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("school");
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
app.get("/api/school/Student_Info", async (req, res, next) => {
  req.url = "/api/school/Students_list";
  return next();
});

app.get("/api/school/Exam_data", async (req, res, next) => {
  req.url = "/api/school/Students_list";
  return next();
});

app.get("/api/school/Students_list", async (req, res) => {
  try {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("school");
    const collectionData = db.collection("students");
    const Coll = [];

    // Read all documents in the collection
    const documents = await collectionData.find({}).toArray();

    //Fetch of collections
    const obj = { name: "students", objArr: [] };
    documents.forEach((document) => {
      obj.objArr.push(document);
    });

    Coll.push(obj);

    console.log("Collection: ", Coll);

    res.json(Coll);
    client.close();
  } catch (err) {
    console.error("Error fetching collections:", err);
    res.status(500).json({ error: "Error fetching collections:" });
  }
});

app.get("/api/school/search/:searchId", async (req, res) => {
  try {
    const searchId = req.params.searchId;
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("school");
    const collection = db.collection("grades");
    //const collections = await collectionData.listCollections().toArray();

    const Coll = [];

    // Read all documents in the collection
    const documents = await collection.find({ studentId: searchId }).toArray();

    //Fetch of collections
    const obj = { name: collection.name, objArr: [] };
    documents.forEach((document) => {
      obj.objArr.push(document);
    });

    Coll.push(obj);

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
  console.log(`Express.js server is listening on the port ${port}`);
});
