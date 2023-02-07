import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteForm, getForms } from "./api/formService";
import "./App.css";

function App() {
  const [forms, setForms] = useState([]);
  const fetchForms = useCallback(async () => {
    const response = await getForms();
    setForms(response.data);
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const removeForm = useCallback(async (id) => {
    try {
      await deleteForm(id);
      fetchForms();
    } catch(e) {
      alert('Error while deleting form!');
      console.log(e);
    }
  },[fetchForms]);

  return (
    <div className="container">
      <h1>List of forms</h1>
      <div>
        {forms.length ? (
            <div>
              <div className="form-row">
                <div>Form Name</div>
                <div>Form URL</div>
                <div>Total Questions</div>
                <div></div>
              </div>
              {forms.map(({_id, questions, title}) => (
                <div className="form-row" key={_id}>
                  <div><b>{title}</b></div>
                  <div>
                    <Link to={`submit/${_id}`}>{`${window.location.href}submit/${_id}`}</Link>
                  </div>
                  <div>{questions.length}</div>
                  <div>
                    <button className="remove-form" onClick={() => removeForm(_id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
        ) : (
          <p className="error-text">No forms found!</p>
        )}
      </div>
      <Link className="create-form" to="/create">
        Create form
      </Link>
    </div>
  );
}

export default App;
