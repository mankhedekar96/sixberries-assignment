const mongoose = require("mongoose");

// Define the Form Schema
const formSchema = new mongoose.Schema({
    questions: [
      {
        question: String,
        type: String,
      },
    ],
});
  
// Compile the Schema into a Model
const Form = mongoose.model("Form", formSchema);

module.exports = Form;