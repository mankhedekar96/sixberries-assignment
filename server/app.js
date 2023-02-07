const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Form, Question } = require("./schemas");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// Added to remove warning in logs
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/form-builder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new form
app.post("/forms", async (req, res) => {
  const form = new Form({
    title: req.body.title,
    questions: [],
  });

  try {
    for (const question of req.body.questions) {
      const newQuestion = new Question(question);
      await newQuestion.save();
      form.questions.push(newQuestion._id);
    }
    const savedForm = await form.save();
    res.send(savedForm);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all forms
app.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.send(forms);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// Get a specific form
app.get("/forms/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.send(form);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a form
app.patch("/forms/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, {
      questions: req.body.questions,
    });
    res.send(form);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a form
app.delete("/forms/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    res.send(form);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
