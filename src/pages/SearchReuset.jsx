import React, { useState } from 'react';
import '../styels/SearchRequest.css'; 

const roommatesData = [
  {
    id: 1,
    name: "Rrof. Mohammed Hijazi",
    major: "ICS",
    age: 22,
    city: "Dhahran",
    smoking: "no",
    rating: 4,
    details: "Mohammed enjoys programming and outdoor activities."
  },
  {
    id: 2,
    name: "Rrof. Ahmed Al-Sayed",
    major: "Engineering",
    age: 24,
    city: "Alkhobar",
    smoking: "yes",
    rating: 3,
    details: "Ahmed is a mechanical engineering student interested in robotics."
  },
  {
    id: 3,
    name: "Rrof. Al-Mohammed",
    major: "ICS",
    age: 21,
    city: "Dhahran",
    smoking: "no",
    rating: 5,
    details: "Al is passionate about AI and machine learning."
  },
];

const SearchRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const [filterPreference, setFilterPreference] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedRoommate, setSelectedRoommate] = useState(null); 

  const filteredRoommates = roommatesData.filter((roommate) => {
    return (
      (roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roommate.major.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCity ? roommate.city === filterCity : true) &&
      (filterMajor ? roommate.major === filterMajor : true) &&
      (filterPreference ? roommate.smoking === filterPreference : true)
    );
  });

  // Function to open the modal and set the selected roommate
  const openModal = (roommate) => {
    setSelectedRoommate(roommate);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoommate(null);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or major..."
          className="input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <select
          className="select"
          onChange={(e) => setFilterCity(e.target.value)}
        >
          <option value="">Select City</option>
          <option value="Dhahran">Dhahran</option>
          <option value="Alkhobar">Alkhobar</option>
        </select>

        <select
          className="select"
          onChange={(e) => setFilterMajor(e.target.value)}
        >
          <option value="">Select Major</option>
          <option value="ICS">ICS</option>
          <option value="Engineering">Engineering</option>
        </select>

        <select
          className="select"
          onChange={(e) => setFilterPreference(e.target.value)}
        >
          <option value="">Select Preferences</option>
          <option value="yes">Non-smoking</option>
          <option value="no">Smoker</option>
        </select>
      </div>

      <div className="roommate-list">
        {filteredRoommates.map((roommate) => (
          <div key={roommate.id} className="roommate-card">
            <div className="roommate-header">
              <div className="roommate-info">
                <h3 className="roommate-name">{roommate.name}</h3>
              </div>
            </div>
            <div className="roommate-details">
              <p className="roommate-details-p">Major: {roommate.major}</p>
              <p className="roommate-details-p">Age: {roommate.age}</p>
              <p className="roommate-details-p">City: {roommate.city}</p>
              <p className="roommate-details-p">Smoking: {roommate.smoking}</p>
            </div>
            <div className="roommate-footer">
              <div className="roommate-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < roommate.rating ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button className="details-button" onClick={() => openModal(roommate)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Showing Roommate Details */}
      {isModalOpen && selectedRoommate && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Roommate Details</h2>
              <button onClick={closeModal} className="close-btn">X</button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {selectedRoommate.name}</p>
              <p><strong>Major:</strong> {selectedRoommate.major}</p>
              <p><strong>Age:</strong> {selectedRoommate.age}</p>
              <p><strong>City:</strong> {selectedRoommate.city}</p>
              <p><strong>Smoking:</strong> {selectedRoommate.smoking}</p>
              <p><strong>Details:</strong> {selectedRoommate.details}</p>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRequest;
