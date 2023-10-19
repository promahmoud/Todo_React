import React, { Fragment, useState } from "react";
import "./Table.css";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterButton from "./FilterButton";

function Table({ rows, deleteRow, editRow }) {
      const [filter, setFilter] = useState("All");

  // console.log(rows[0].status);
const FILTER_MAP = {
      All: () => true,
      not_started: (row) => {
            if (row.status === "not_started") {
            return true;
            }
      },
      in_progress	: (row) => {
            if (row.status === "in_progress") {
            return true;
            }
      },
      Finished: (row) => {
            if (row.status === "Finished") {
            return true;
            }
      },
      };
const FILTER_NAMES = Object.keys(FILTER_MAP);

const filterList = FILTER_NAMES.map((name) => (
      <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
      />
));

return (
      <Fragment>
      <div className="filters btn-group stack-exception">{filterList}</div>
      <div className="table-wrapper">
            <table className="table">
            <thead>
            <tr>
                  <th scope="col">Task name</th>
                  <th className="expand" scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {rows.filter(FILTER_MAP[filter]).map((row, idx) => {
                  const statusText =
                  row.status.charAt(0).toUpperCase() +
                  row.status.slice(1).split("_").join(" ");

            return (
                  <Fragment key={idx}>
                        <tr key={idx}>
                              <td data-label="Task name">{row.task}</td>
                              <td className="expand" data-label="Description">{row.description}</td>
                              <td data-label="Status">
                              <span className={`label label-${row.status}`}>
                                    {statusText}
                              </span>
                              </td>
                        <td className="fit" data-label="Action">
                              <span className="actions">
                              <FontAwesomeIcon
                                    icon={faTrash}
                                    className="delete-btn"
                                    onClick={() => deleteRow(idx)}
                              />
                              <FontAwesomeIcon
                              icon={faEdit}
                              className="edit-btn"
                              onClick={() => editRow(idx)}
                              />
                              </span>
                        </td>
                  </tr>
                  <tr className="spacer">
                        <td colSpan="100"></td>
                  </tr>
                  </Fragment>
                  );
            })}
                  </tbody>
            </table>
      </div>
      </Fragment>
      );
}

export default Table;
