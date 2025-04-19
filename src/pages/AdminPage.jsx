import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const dummyStudents = [
      { id: 1, name: 'Thamer Aljohani', email: 'thamer@example.com' },
      { id: 2, name: 'Imad Abdullah', email: 'imad@example.com' },
    ];

    const dummyRequests = [
      { id: 1, title: 'Need roommate in Building 854', description: 'Looking for a quiet unsmoking roommate ' },
      { id: 2, title: 'Shared apartment in building 855', description: '2-bedroom flat, looking for one more student' },
    ];

    setStudents(dummyStudents);
    setRequests(dummyRequests);
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-section">
          <h2>All Registered Students</h2>
          <ul className="admin-list">
            {students.map((student) => (
              <li key={student.id}>
                <strong>{student.name}</strong> – {student.email}
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-section">
          <h2>Student Requests</h2>
          <ul className="admin-list">
            {requests.map((req) => (
              <li key={req.id}>
                <strong>{req.title}</strong>
                <p>{req.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
