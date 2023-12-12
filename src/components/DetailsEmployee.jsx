import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DetailsEmployee = () => {
  const { empId } = useParams();
  const [employee, setEmployee] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/employees/${empId}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  }, [empId]);

  return (
    <div>
      <h3>Employee Data</h3>
      <h4>name : {employee?.name}</h4>
      <h4>position : {employee?.position}</h4>
      <h4>salary : {employee?.salary} Pounds</h4>
    </div>
  );
};

export default DetailsEmployee;
