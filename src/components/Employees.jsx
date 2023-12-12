import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Employees = ({ allEmployees, getAllEmployees }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [idUpdate, setIdUpdate] = useState();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);

  // Get All Employees
  useEffect(() => {
    getAllEmployees();
  }, []);

  // Delete Employee
  const HandelDelete = (emp) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will delete ${emp.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/employees/${emp.id}`)
          .then(() => getAllEmployees());
        Swal.fire({
          title: "Deleted!",
          text: "It has been deleted successfully.",
          icon: "success",
        });
      }
    });
  };

  const handelEdit = (emp) => {
    setShow(true);
    setIdUpdate(emp.id);
    setName(emp.name);
    setPosition(emp.position);
    setSalary(emp.salary);
  };
  const handleClose = () => {
    setShow(false);
  };

  // Update Employee
  const UpdateEmployee = () => {
    if (name.trim() !== "" && position.trim() !== "" && salary !== 0) {
      axios
        .put(`http://localhost:5000/employees/${idUpdate}`, {
          name,
          position,
          salary,
        })
        .then(() => {
          getAllEmployees();
          setShow(false);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    } else {
      console.error("Invalid data for updating employee.");
    }
  };

  return (
    <>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>operation</th>
            </tr>
          </thead>
          {allEmployees &&
            allEmployees.map((emp, index) => {
              return (
                <>
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{emp.name}</td>
                      <td>{emp.position}</td>
                      <td>{emp.salary}</td>
                      <td>
                        <Button
                          onClick={() => navigate(`/employee/${emp.id}`)}
                          variant="primary"
                        >
                          Details
                        </Button>
                        <Button onClick={() => handelEdit(emp)} variant="info">
                          Edit
                        </Button>
                        <Button
                          onClick={() => HandelDelete(emp)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form.Label htmlFor="name">name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby="name"
              maxlength="25"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Label htmlFor="position">position</Form.Label>
            <Form.Control
              type="text"
              id="position"
              aria-describedby="position"
              maxlength="25"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />

            <Form.Label htmlFor="salary">salary (USD)</Form.Label>
            <Form.Control
              type="number"
              id="salary"
              aria-describedby="salary"
              maxlength="5"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => UpdateEmployee()} variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Employees;
