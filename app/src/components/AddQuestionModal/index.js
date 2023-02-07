import { useCallback, useState } from "react";
import { AnswerType } from "../../pages/CreateForm";
import "./AddQuestionModal.css";

function AddQuestionModal(props) {
  const { onSubmit, onClose } = props;
  const [questionState, setQuestionState] = useState({
    title: "",
    type: "",
    options: [],
  });

  const handleQuestionTitle = useCallback((e) => {
    setQuestionState((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  }, []);

  const handleAnswerType = useCallback((e) => {
    setQuestionState((prevState) => ({
      ...prevState,
      type: e.target.value,
    }));
  }, []);

  const handleOptions = useCallback((e) => {
    setQuestionState((prevState) => ({
      ...prevState,
      options: e.target.value.split('\n'),
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(questionState);
    onClose();
  },[onClose, onSubmit, questionState])

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h1>Add Question</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="question-name-input"
            type="text"
            value={questionState.title}
            placeholder="Enter form name"
            onChange={handleQuestionTitle}
            required
          />
          <select
            className="answer-type-select"
            defaultValue={questionState.type}
            onChange={handleAnswerType}
            required
          >
            <option value="">Select answer type</option>
            <option value="text">{AnswerType.text}</option>
            <option value="mcq">{AnswerType.mcq}</option>
            <option value="scq">{AnswerType.scq}</option>
          </select>

          {questionState.type && questionState.type !== "text" ? (
            <textarea
              className="question-name-input"
              placeholder="Enter each option on next line"
              rows={6}
              onChange={handleOptions}
              required
            ></textarea>
          ) : null}

          <button className="save-question" type="submit">
            Save
          </button>
          <button className="close-form" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionModal;
