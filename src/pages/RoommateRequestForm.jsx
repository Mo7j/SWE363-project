import React, { useState } from "react";
import "./RoommateRequestForm.css";

function RoommateRequestForm() {
  const [formData, setFormData] = useState({
    myName: "", myAge: "", myMajor: "", mySmoking: "", myOther: "",
    roommateBuildingRoom: "", roommateAge: "", roommateMajor: "", roommateSmoking: "", roommateOther: ""
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
        <input name="myName" value={formData.myName} placeholder="Name" onChange={handleChange} />
        <input name="myAge" value={formData.myAge} placeholder="Age" onChange={handleChange} />
        <input name="myMajor" value={formData.myMajor} placeholder="Major" onChange={handleChange} />
        <select name="mySmoking" value={formData.mySmoking} onChange={handleChange}>
          <option value="">Smoker / Non-Smoker</option>
          <option>Smoker</option>
          <option>Non-Smoker</option>
        </select>
        <input name="myOther" value={formData.myOther} placeholder="Other info..." onChange={handleChange} />

        <h2>Preferred Roommate Info</h2>
        <input name="roommateBuildingRoom" value={formData.roommateBuildingRoom} placeholder="Preferred Building / Room" onChange={handleChange} />
        <input name="roommateAge" value={formData.roommateAge} placeholder="Age" onChange={handleChange} />
        <input name="roommateMajor" value={formData.roommateMajor} placeholder="Major" onChange={handleChange} />
        <select name="roommateSmoking" value={formData.roommateSmoking} onChange={handleChange}>
          <option value="">Smoker / Non-Smoker</option>
          <option>Smoker</option>
          <option>Non-Smoker</option>
        </select>
        <input name="roommateOther" value={formData.roommateOther} placeholder="Other preferences..." onChange={handleChange} />

        <button type="submit" className="green-button">Submit Request</button>
      </form>
    </div>
  );
}

export default RoommateRequestForm;
