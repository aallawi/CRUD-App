import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavbarCom from "./components/NavbarCom";
import Employees from "./components/Employees";
import DetailsEmployee from "./components/DetailsEmployee";
import "./App.css";
import axios from "axios";

function App() {
  const [allEmployees, setAllEmployees] = useState();

  const getAllEmployees = () => {
    axios
      .get("http://localhost:5000/employees")
      .then((req) => setAllEmployees(req.data));
  };

  return (
    <div>
      <NavbarCom getAllEmployees={getAllEmployees} />
      <div className="">
        <Routes>
          <Route
            path="employee"
            element={
              <Employees
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
                getAllEmployees={getAllEmployees}
              />
            }
          />
          <Route path="employee/:empId" element={<DetailsEmployee />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
