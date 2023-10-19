import React, { useState } from 'react'
import './Modal.css';

function Modal({ closeModal, onSubmit, defaultValue, Addorupdate }) {
      const [formState, setFormState] = useState(
            defaultValue || {
                  task: "",
                  description: "",
                  status: "not_started",
            }
      );
      const [errors, setErrors] = useState("");

      const validateForm = () => {
            if (formState.task && formState.description && formState.status) {
                  setErrors("");
                  return true;
            } else {
                  let errorFields = [];
                  for (const [key, value] of Object.entries(formState)) {
                        if (!value) {
                              errorFields.push(key);
                        }
                  }
                  setErrors(errorFields.join(", "));
                  return false;
            }
      };
      const handleChange = (e) => {
            setFormState({ ...formState, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
            e.preventDefault();

            if (!validateForm()) return;

            onSubmit(formState);

            closeModal();
      };
      return (
            <div
                  className="modal-container"
                  onClick={(e) => {
                        if (e.target.className === "modal-container") closeModal();
                  }}
            >
                  <div className="modal">
                        <form>
                              <div className="form-group">
                                    <label htmlFor="task">Task</label>
                                    <input name="task" onChange={handleChange} value={formState.task} />
                              </div>
                              <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                          name="description"
                                          onChange={handleChange}
                                          value={formState.description}
                                    />
                              </div>
                              <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select
                                          name="status"
                                          onChange={handleChange}
                                          value={formState.status}
                                    >
                                          <optgroup label = "Choose One"/>
                                          <option value="not_started">Not Started</option>
                                          <option value="in_progress">In Progress</option>
                                          <option value="Finished">Finished</option>
                                    </select>
                              </div>
                              {errors && <div className="error">{`Please include: ${errors}`}</div>}
                              <button type="submit" className="addbtn" onClick={handleSubmit}>
                              {Addorupdate}
                              </button>
                        </form>
                  </div>
            </div>
      )
}

export default Modal