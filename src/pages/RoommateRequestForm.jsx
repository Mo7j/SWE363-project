import React, { useState } from "react";
import "./RoommateRequestForm.css";

function RoommateRequestForm() {
  const [formData, setFormData] = useState({
    myName: "", myAge: "", myMajor: "", mySmoking: "", myOther: "",
    roommateName: "", roommateAge: "", roommateMajor: "", roommateSmoking: "", roommateOther: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Request submitted!");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>My Info</h2>
        <input name="myName" placeholder="Name" onChange={handleChange} />
        <input name="myAge" placeholder="Age" onChange={handleChange} />
        <input name="myMajor" placeholder="Major" onChange={handleChange} />
        <select name="mySmoking" onChange={handleChange}>
          <option value="">Smoker / Non-Smoker</option>
          <option>Smoker</option>
          <option>Non-Smoker</option>
        </select>
        <input name="myOther" placeholder="Other info..." onChange={handleChange} />

        <h2>Preferred Roommate Info</h2>
        <input name="roommateName" placeholder="Name" onChange={handleChange} />
        <input name="roommateAge" placeholder="Age" onChange={handleChange} />
        <input name="roommateMajor" placeholder="Major" onChange={handleChange} />
        <select name="roommateSmoking" onChange={handleChange}>
          <option value="">Smoker / Non-Smoker</option>
          <option>Smoker</option>
          <option>Non-Smoker</option>
        </select>
        <input name="roommateOther" placeholder="Other preferences..." onChange={handleChange} />

        <button type="submit" className="green-button">Submit Request</button>
      </form>
    </div>
  );
}

export default RoommateRequestForm;