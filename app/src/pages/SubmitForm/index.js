import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormById, submitResponse } from "../../api/formService";
import "./SubmitForm.css";

function SubmitForm() {
  const [form, setForm] = useState({ title: "", questions: [] });
  const [response, setResponse] = useState({ formId: "", answers: [] });
  const { formId } = useParams();
  const navigate = useNavigate();

  const fetchFormById = useCallback(async () => {
    const response = await getFormById(formId);
    setForm(response.data);
    setResponse({
      formId: formId,
      answers: response.data.questions.map(({ _id, title }) => ({
        questionId: _id,
        question: title,
        answer: "",
      })),
    });
  }, [formId]);

  useEffect(() => {
    fetchFormById();
  }, [fetchFormById]);

  const onAnswerInput = useCallback((e, id) => {
    setResponse((prevState) => ({
      ...prevState,
      answers: prevState.answers.map((el) =>
        el.questionId === id ? { ...el, answer: e.target.value } : el
      ),
    }));
  }, []);

  const onAnswerChecked = useCallback((e, id, option) => {
    if (e.target.checked) {
      setResponse((prevState) => ({
        ...prevState,
        answers: prevState.answers.map((el) => {
          if (el.questionId === id) {
            return {
              ...el,
              answer: [
                ...el.answer.split(",").filter((el) => el !== ""),
                option,
              ].join(","),
            };
          } else return el;
        }),
      }));
    } else {
      setResponse((prevState) => ({
        ...prevState,
        answers: prevState.answers.map((el) =>
          el.questionId === id
            ? {
                ...el,
                answer: el.answer
                  .split(",")
                  .filter((el) => el !== option)
                  .join(","),
              }
            : el
        ),
      }));
    }
  }, []);

  const questionBuilder = useCallback(
    ({ _id, type, options }) => {
      // eslint-disable-next-line default-case
      switch (type) {
        case "text":
          return (
            <input
              className="question-name-input"
              type="text"
              onChange={(e) => onAnswerInput(e, _id)}
            />
          );
        case "mcq":
          return options.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                id={option}
                name={option}
                onChange={(e) => onAnswerChecked(e, _id, option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ));
        case "scq":
          return options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                id={option}
                value={option}
                name={_id}
                onChange={(e) => onAnswerInput(e, _id)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ));
      }
    },
    [onAnswerChecked, onAnswerInput]
  );

  const onSubmitResponse = useCallback(
    async (e) => {
      e.preventDefault();
        try {
            // eslint-disable-next-line no-restricted-globals
            if(confirm('Do you want to submit the response?')){
                await submitResponse(response);
                navigate("/");
            }
        } catch (e) {
          alert("Error while submitting response!");
          console.log(e);
        }
    },
    [navigate, response]
  );

  return (
    <div className="container">
      <h1>{form.title}</h1>
      <form onSubmit={onSubmitResponse}>
        {form.questions.map((question) => (
          <div key={question._id}>
            <p>
              <b>{question.title}</b>
            </p>
            {questionBuilder(question)}
          </div>
        ))}
        <button className="save-question" type="submit">
          Submit Response
        </button>
      </form>
    </div>
  );
}

export default SubmitForm;
