import React, { useEffect, useState } from 'react';
import '../styels/AdminPage.css';
import LogoutButton from "../components/LogoutButton";
import ManageAccounts from "../components/ManageAccounts";
import PostAnnouncements from "../components/PostAnnouncements";
import { useNavigate } from 'react-router-dom';
import { getAllRequests } from "../backend/requests";
import { getAllUsers } from "../backend/users"; 


const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [requestSearchTerm, setRequestSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudentsAndRequests = async () => {
      try {
        const users = await getAllUsers(); 
        const formattedStudents = users.map((user) => ({
          id: user.uid,
          name: user.name || "No name",
          email: user.email || "No email",
        }));
  
        const realRequests = await getAllRequests(); 
  
        setStudents(formattedStudents);
        setRequests(realRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchStudentsAndRequests();
  }, []);
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} `.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRequests = requests.filter((req) =>
    `${req.name} ${req.email} ${req.city} ${req.building}`
      .toLowerCase()
      .includes(requestSearchTerm.toLowerCase())
  );
  
  return (
    <div className="admin-container">
      <div className="admin-box">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-section">
          <h2>All Registered Students</h2>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input" />
          <ul className="admin-list">
            {filteredStudents.map((student) => (
              <li key={student.id}>
                <strong>{student.name}</strong> – {student.email} <ManageAccounts studentId={student.id} isBanned={false} onToggleBan={() => {}} />
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-section">
          <h2>Student Requests</h2>
          <ul className="admin-list">
          <input
            type="text"
            placeholder="Search requests by name, email, city, or building"
            value={requestSearchTerm}
            onChange={(e) => setRequestSearchTerm(e.target.value)}
            className="admin-search-input"
            />

            {filteredRequests.map((req) => (
              <li key={req.id}>
                <strong>{req.name}</strong> – {req.email} <br />
                <strong>Major:</strong> {req.major} <br />
                <strong>Age:</strong> {req.age} <br />
                <strong>City:</strong> {req.city} <br />
                <strong>Smoking:</strong> {req.smoking} <br />
                <strong>Building:</strong> {req.building} <br />
                <strong>Details:</strong> {req.details} <br />
              </li>
            ))}
          </ul>
        </div>
        <LogoutButton /> <PostAnnouncements />
      </div>
    </div>
  );
};

export default AdminPage;
