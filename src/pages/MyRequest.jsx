import React, { useState } from 'react';
import '../styels/MyRequests.css'; 

/* Dummy Data */
const sentRequests = [
  {
    id: 1,
    name: "Rrof. Mohammed Hijazi",
    email: "s202182750@kfupm.edu.sa",
    major: "ICS",
    age: 22,
    city: "Dhahran",
    smoking: "no",
    status: "pending", // Status of the request (pending, accepted, rejected)
  },
  {
    id: 2,
    name: "Rrof. Ahmed Al-Sayed",
    email: "s202282750@kfupm.edu.sa",
    major: "Engineering",
    age: 24,
    city: "Alkhobar",
    smoking: "yes",
    status: "accepted", // Example accepted status
  },
];

const receivedRequests = [
  {
    id: 1,
    name: "Rrof. Al-Mohammed",
    email: "s202382750@kfupm.edu.sa",
    major: "ICS",
    age: 21,
    city: "Dhahran",
    smoking: "no",
    status: "pending",
  },
  {
    id: 2,
    name: "Rrof. Sarah Al-Sayed",
    email: "s202482750@kfupm.edu.sa",
    major: "Engineering",
    age: 23,
    city: "Alkhobar",
    smoking: "yes",
    status: "pending",
  },
];

const MyRequests = () => {
  const [mySentRequests, setMySentRequests] = useState(sentRequests); // Sent requests state
  const [myReceivedRequests, setMyReceivedRequests] = useState(receivedRequests); // Received requests state

  // Handle the accept or reject of a received request
  const handleRequestStatus = (id, action) => {
    const updatedRequests = myReceivedRequests.map((request) =>
      request.id === id ? { ...request, status: action } : request
    );
    setMyReceivedRequests(updatedRequests);
  };

  return (
    <div className="container">
      <div className="section">
        <h2>My Sent Requests</h2>
        <div className="request-list">
          {mySentRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <h3>{request.name}</h3>
                <p>Status: {request.status}</p>
              </div>
              <div className="request-body">
                <p>Email: {request.email}</p>
                <p>Major: {request.major}</p>
                <p>Age: {request.age}</p>
                <p>City: {request.city}</p>
                <p>Smoking: {request.smoking}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Requests I Got</h2>
        <div className="request-list">
          {myReceivedRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <h3>{request.name}</h3>
                <p>Status: {request.status}</p>
              </div>
              <div className="request-body">
                <p>Email: {request.email}</p>
                <p>Major: {request.major}</p>
                <p>Age: {request.age}</p>
                <p>City: {request.city}</p>
                <p>Smoking: {request.smoking}</p>
              </div>
              {request.status === "pending" && (
                <div className="request-footer">
                  <button
                    className="accept-button"
                    onClick={() => handleRequestStatus(request.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleRequestStatus(request.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
