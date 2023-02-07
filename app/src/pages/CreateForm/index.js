import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createForm } from "../../api/formService";
import AddQuestionModal from "../../components/AddQuestionModal";
import "./CreateForm.css";

export const AnswerType = {
  text: "Text",
  mcq: "Multiple Choice Question",
  scq: "Single Choice (Radio)",
};

function CreateForm() {
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const navigate = useNavigate();


  const onQuestionSubmit = useCallback(
    (question) => setQuestions((prevState) => [...prevState, question]),
    []
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if(!questions.length) return alert('Please add some questions!');
      try {
        await createForm({
          title: formName,
          questions
        });
        navigate("/");
      } catch(e) {
        alert('Error while creating form!');
        console.log(e);
      }
    },
    [formName, navigate, questions]
  );

  return (
    <div className="container">
      <h1>Create form</h1>
      <form onSubmit={onSubmit}>
        <input
          className="form-name-input"
          type="text"
          value={formName}
          placeholder="Enter form name"
          onChange={(e) => setFormName(e.target.value)}
          required
        />
        <button className="save-question" type="submit">Save</button>
        <button
          className="add-question"
          onClick={(e) => { 
            e.preventDefault();
            setOpenCreateForm(true);
          }}
        >
          Add question
        </button>
      </form>
      {openCreateForm ? (
        <AddQuestionModal
          onSubmit={onQuestionSubmit}
          onClose={() => setOpenCreateForm(false)}
        />
      ) : null}
      <div>
        {questions.length ? (
          questions.map(({ id, title, type, options }) => (
            <details className="question-details" key={id}>
              <summary>{title}</summary>
              <p>Answer type: {AnswerType[type]}</p>
              {options && options.length ? (
                <ul>
                  {options.map((option, index) => (
                    <li key={`${option}-${index + 1}`}>{option}</li>
                  ))}
                </ul>
              ) : null}
            </details>
          ))
        ) : (
          <p className="error-text"> No questions added! </p>
        )}
      </div>
    </div>
  );
}

export default CreateForm;
