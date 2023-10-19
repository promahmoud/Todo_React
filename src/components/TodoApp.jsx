import { React, useState } from 'react';
import Table from './Table';
import Modal from './Modal';


function TodoApp() {

      const [modalOpen, setModalOpen] = useState(false);
      const [rows, setRows] = useState([
            {
            task: "Task1",
            description: "This is the main page of the website",
            status: "not_started",
            },
            {
            task: "Task2",
            description: "This page has details about the company",
            status: "in_progress",
            },
            {
            task: "Task3",
            description: "Prices for different subscriptions",
            status: "Finished",
            },
      ]);
      const [rowToEdit, setRowToEdit] = useState(null);

      const handleDeleteRow = (targetIndex) => {
            setRows(rows.filter((_, idx) => idx !== targetIndex));
      };

      const handleEditRow = (idx) => {
            setRowToEdit(idx);
            setModalOpen(true);
      };

      const handleSubmit = (newRow) => {
            rowToEdit === null
            ? setRows([...rows, newRow])
            : setRows(
            rows.map((currRow, idx) => {
                  if (idx !== rowToEdit) return currRow;

            return newRow;
            })
            );
      };


      const handleLogout=()=>{
            localStorage.clear();
            window.location.reload();
      }


return (
      <div className="App">
            <button className="logoutbtn" onClick={handleLogout}>Logout</button>

            <button onClick={() => setModalOpen(true)} className="addbtn">
                  Add Task
            </button>
            <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />


            {modalOpen && (
                  <Modal
                  closeModal={() => {
                  setModalOpen(false);
                  setRowToEdit(null);
                  }}
                  Addorupdate={rowToEdit !== null? 'Update Task': 'Add New'}
                  onSubmit={handleSubmit}
                  defaultValue={rowToEdit !== null && rows[rowToEdit]}
                  />
            )}
      </div>
      )
}

export default TodoApp