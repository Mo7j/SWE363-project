import React, { useState, useEffect, useRef } from 'react';
import '../styels/chattingPage.css';

const initialUsers = [
  { id: 1, name: 'Mohammed', avatar: '🧔', bio: 'Available' },
  { id: 2, name: 'Turki', avatar: '👨‍💼', bio: 'At work' },
  { id: 3, name: 'Thamer', avatar: '🧑‍💻', bio: 'Coding...' },
  { id: 4, name: 'Abdulrahman', avatar: '👨‍🎓', bio: 'Studying' },
  { id: 5, name: 'Ajmi', avatar: '👨‍🚀', bio: 'Exploring space' },
];

function ChattingPage() {
    const [users] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState({
    name: 'You',
    avatar: '🙂',
    bio: 'Online',
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedUser]);

  const handleSend = () => {
    if (input.trim() === '' || !selectedUser) return;
    const time = new Date();
    const timestamp = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      text: input,
      time: timestamp,
      sender: 'You',
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }));
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateSettings = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const avatar = e.target.avatar.value;
    const bio = e.target.bio.value;

    setCurrentUser({ name, avatar, bio });
    setSettingsOpen(false);
  };

  return (
    <div className="chat-page">
      <div className="sidebar">
        <div className="settings-header">
          <div className="current-user">
            <span className="avatar">{currentUser.avatar}</span>
            <strong>{currentUser.name}</strong>
          </div>
          <button className="settings-btn" onClick={() => setSettingsOpen(true)}>⚙️</button>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="user-list">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user ${selectedUser?.id === user.id ? 'active' : ''}`}
              onClick={() => handleSelectUser(user)}
            >
              <span className="avatar">{user.avatar}</span>
              <div>
                <strong>{user.name}</strong>
                <div className="bio">{user.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedUser ? (
        <div className="chat-container">
          <div className="chat-header">
            <span className="avatar">{selectedUser.avatar}</span>
            {selectedUser.name}
          </div>
          <div className="chat-messages">
            {(messages[selectedUser.id] || []).map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}
              >
                <div className="bubble">{msg.text}</div>
                <div className="msg-header">{msg.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <div className="no-user">Select a user to start chatting</div>
      )}

      {settingsOpen && (
        <div className="settings-overlay">
          <form className="settings-modal" onSubmit={updateSettings}>
            <h3>Settings</h3>
            <input name="name" defaultValue={currentUser.name} placeholder="Name" required />
            <input name="avatar" defaultValue={currentUser.avatar} placeholder="Avatar emoji" required />
            <textarea name="bio" defaultValue={currentUser.bio} placeholder="Bio" rows="3" />
            <div className="settings-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setSettingsOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChattingPage;
