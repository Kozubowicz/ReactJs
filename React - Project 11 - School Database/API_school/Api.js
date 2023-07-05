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

//MongoDB moongoose schema for selected collections
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
  email: {
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

// Post function to SignUp
app.post("/api/SignUp", async (req, res) => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });
    const db = mongoose.connection.useDb("school");
    const { name, surname, email, password } = req.body;

    // Checking if an email already exists in the "teachers" collection
    const Teacher = db.model("Teacher", teacherSchema);
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Password hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Saving new teacher in  database
    const newTeacher = new Teacher({
      _id: new mongoose.Types.ObjectId(),
      name,
      surname,
      email,
      password: hashedPassword,
    });
    await newTeacher.save();
    mongoose.connection.close();
    res.json({ success: true });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false });
  }
});

// Post function Log In
app.post("/api/LogIn", async (req, res) => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });
    const db = mongoose.connection.useDb("school");
    const { userEmail, userPassword } = req.body;

    const Teacher = db.model("Teacher", {
      email: String,
      password: String,
    });

    const teacher = await Teacher.findOne({ email: userEmail });
    // Checking if there is a user with the given email
    if (!teacher) {
      return res.status(401).json({ success: false, message: "Invalid login data" });
    }

    // Password hashing
    const passwordMatch = await bcrypt.compare(userPassword, teacher.password);
    // Checking if the password is correct
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid login data" });
    }

    mongoose.connection.close();
    res.json({ success: true, id: teacher._id });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false });
  }
});

// Post function to add exam grades
app.post("/api/Exam", async (req, res) => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });

    const db = mongoose.connection.useDb("school");

    const newRecords = req.body;

    const grade = db.model("Grade", gradeSchema);
    const newGrades = newRecords.map((record) => ({
      _id: new mongoose.Types.ObjectId(),
      ...record,
    }));

    // Adding records do database
    await grade.insertMany(newGrades);
    mongoose.connection.close();
    res.json({ success: true });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false });
  }
});

// Post function allowing to add and remove objects from collection
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

// API Endpoint return school all collections
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

      // Fetch of collections
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

// API Endpoint return list of all students
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

    // Fetch of collections
    const obj = { name: "students", objArr: [] };
    documents.forEach((document) => {
      obj.objArr.push(document);
    });

    Coll.push(obj);

    console.log("Collection: ", Coll);

    res.json(Coll);
    client.close();
  } catch (err) {
    console.error("Error fetching collection:", err);
    res.status(500).json({ error: "Error fetching collection:" });
  }
});

// API Endpoint return grades for choose student by studentId
app.get("/api/school/search/:searchId", async (req, res) => {
  try {
    const searchId = req.params.searchId;
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("school");
    const collection = db.collection("grades");

    const Coll = [];

    // Read all documents in the collection
    const documents = await collection.find({ studentId: searchId }).toArray();

    // Fetch of collections
    const obj = { name: collection.name, objArr: [] };
    documents.forEach((document) => {
      obj.objArr.push(document);
    });

    Coll.push(obj);

    console.log("Collections: ", Coll);
    res.json(Coll);

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
