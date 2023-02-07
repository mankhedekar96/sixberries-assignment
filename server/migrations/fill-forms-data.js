const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
});

const Form = mongoose.model("Form", formSchema);
const Question = mongoose.model("Question", questionSchema);

const forms = [
  {
    title: "Sample Form 1",
    description: "This is a sample form",
    questions: [],
  },
  {
    title: "Sample Form 2",
    description: "This is another sample form",
    questions: [],
  },
];

const questions = [
  {
    title: "What is your name?",
    type: "text",
    options: [],
  },
  {
    title: "What is your age?",
    type: "number",
    options: [],
  },
  {
    title: "What is your gender?",
    type: "radio",
    options: ["Male", "Female", "Other"],
  },
];

const fillMockData = async () => {
  for (const form of forms) {
    const newForm = new Form(form);
    for (const question of questions) {
      const newQuestion = new Question(question);
      await newQuestion.save();
      newForm.questions.push(newQuestion._id);
    }
    await newForm.save();
  }
};

module.exports = fillMockData;
