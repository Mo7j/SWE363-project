import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styels/AdminChatMonitor.css'; 
import { getAllUsers } from '../backend/users';

const AdminChatMonitor = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const users = await getAllUsers(); // 🔁 fetch real users
                setStudents(users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        if (selectedStudent) {
            const fetchChatMessages = async () => {
                const messages = [
                    { id: 1, text: 'Hello!', timestamp: '10:00 AM' },
                    { id: 2, text: 'How are you?', timestamp: '10:05 AM' },
                ];
                setChatMessages(messages);
            };

            fetchChatMessages();
        } else {
            setChatMessages([]);
        }
    }, [selectedStudent]);

    return (
        <div className='admin-chat-monitor-container'>
            <h1 className='admin-chat-monitor-h1'>Admin Chat Monitor</h1>
            <div className='admin-chat-monitor-box'>
                <label htmlFor="student-select">Select a Student: </label>
                <select
                    id="student-select"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    {students.map((student) => (
                        <option key={student.uid} value={student.uid}>
                            {student.name} ({student.email})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h2 className='admin-section'>Chat Messages</h2>
                {chatMessages.length > 0 ? (
                    <ul>
                        {chatMessages.map((message) => (
                            <li key={message.id}>
                                <strong>{message.timestamp}:</strong> {message.text}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No messages to display.</p>
                )}
            </div>
            <button 
                className='navigate-button' 
                onClick={() => navigate('/admin')}
            >
                Go to Admin Page
            </button>
        </div>
    );
};

export default AdminChatMonitor;