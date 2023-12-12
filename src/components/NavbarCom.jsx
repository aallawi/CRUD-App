import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

const NavbarCom = ({ getAllEmployees }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);

  const handleClose = () => {
    setName("");
    setPosition("");
    setSalary(0);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handelAdd = () => {
    if (name !== "" && position !== "" && salary !== 0) {
      axios
        .post("http://localhost:5000/employees", {
          name,
          position,
          salary,
        })
        .then((data) => {
          getAllEmployees();
          setName("");
          setPosition("");
          setSalary(0);
          console.log(data);
        });
    }
    handleClose();
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="employee">View all employees</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button onClick={handleShow} variant="success">
                Add Employee
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the new employee's data</Modal.Title>
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
              required
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={name == "" || position == "" || salary == ""}
            variant="primary"
            onClick={() => handelAdd()}
          >
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarCom;
