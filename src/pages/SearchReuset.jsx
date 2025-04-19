import React, { useState } from 'react';
import '../styels/SearchRequest.css'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook



/* Dummy Data */
const roommatesData = [
  {
    id: 1,
    name: "Rrof. Mohammed Hijazi",
    email: "s202182750@kfupm.edu.sa",
    major: "ICS",
    building: "841 - 332",
    age: 22,
    city: "Dhahran",
    smoking: "no",
    details: "Mohammed enjoys programming and outdoor activities."
  },
  {
    id: 2,
    name: "Rrof. Ahmed Al-Sayed",
    email: "s202282750@kfupm.edu.sa",
    major: "Engineering",
    building: "860 - 231",
    age: 24,
    city: "Alkhobar",
    smoking: "yes",
    details: "Ahmed is a mechanical engineering student interested in robotics."
  },
  {
    id: 3,
    name: "Rrof. Al-Mohammed",
    email: "s202382750@kfupm.edu.sa",
    major: "ICS",
    building: "827 - 132",
    age: 21,
    city: "Dhahran",
    smoking: "no",
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
      roommate.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roommate.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCity ? roommate.city === filterCity : true) &&
      (filterMajor ? roommate.email === filterMajor : true) &&
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

  const navigate = useNavigate();
  const handleChatClick = () => {
    navigate('/chatting');  // Navigate to the chat page
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
          <option value="">Somking</option>
          <option value="no">Non-smoking</option>
          <option value="yes">Smoker</option>
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
              <p className="roommate-details-p">Email: {roommate.email}</p>
              <p className="roommate-details-p">City: {roommate.city}</p>
              <p className="roommate-details-p">Smoking: {roommate.smoking}</p>
            </div>
            <div className="roommate-footer">
              <button className="details-button" onClick={() => openModal(roommate)}>
                View Details
              </button>
              <button className="details-button" onClick={handleChatClick}>
                Chat
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
              <h2 className='modal-header-h2'>Roommate Details</h2>
              <button onClick={closeModal} className="colse-icon">X</button>
            </div>
            <div className="modal-body">
              <p className='modal-body-p'><strong>Name:</strong> {selectedRoommate.name}</p>
              <p className='modal-body-p'><strong>Email:</strong> {selectedRoommate.email}</p>
              <p className='modal-body-p'><strong>Major:</strong> {selectedRoommate.major}</p>
              <p className='modal-body-p'><strong>Age:</strong> {selectedRoommate.age}</p>
              <p className='modal-body-p'><strong>City:</strong> {selectedRoommate.city}</p>
              <p className='modal-body-p'><strong>Smoking:</strong> {selectedRoommate.smoking}</p>
              <p className='modal-body-p'><strong>Building:</strong> {selectedRoommate.building}</p>
              <p className='modal-body-p'><strong>Details:</strong> {selectedRoommate.details}</p>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="close-btn">Send Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRequest;
