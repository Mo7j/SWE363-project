import React, { useState, useEffect, useRef } from "react";
import "./chattingPage.css";

const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChattingPage = () => {
  const [users, setUsers] = useState([
    { name: "John", avatar: "👨", bio: "Frontend Dev" },
    { name: "Jane", avatar: "👩", bio: "UI/UX Designer" },
    { name: "Alice", avatar: "🧑", bio: "Backend Engineer" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "You",
    avatar: "🙂",
    bio: "Just chilling",
  });

  const chatRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim() && selectedUser) {
      const newMsg = {
        sender: currentUser.name,
        text: newMessage.trim(),
        time: new Date(),
      };
      setMessages((prev) => ({
        ...prev,
        [selectedUser]: [...(prev[selectedUser] || []), newMsg],
      }));
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-page">
      <div className="sidebar">
        <div className="settings-header">
          <div className="current-user">
            <span className="avatar">{currentUser.avatar}</span>
            <strong>{currentUser.name}</strong>
          </div>
          <button className="settings-btn" onClick={() => setSettingsOpen(true)}>
            ⚙️
          </button>
        </div>
        <input
          className="search-bar"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="user-list">
          {filteredUsers.map((user) => (
            <div
              key={user.name}
              className={`user ${selectedUser === user.name ? "active" : ""}`}
              onClick={() => setSelectedUser(user.name)}
            >
              <span className="avatar">{user.avatar}</span>
              <div>
                <div>{user.name}</div>
                <div className="bio">{user.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-container">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <span className="avatar">
                {users.find((u) => u.name === selectedUser)?.avatar}
              </span>
              <strong>{selectedUser}</strong>
            </div>
            <div className="chat-messages" ref={chatRef}>
              {messages[selectedUser]?.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === currentUser.name ? "sent" : "received"}`}
                >
                  <div className="bubble">
                    {msg.text}
                    <div className="msg-header">
                      <span>{formatTime(msg.time)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-user">Select a user to start chatting</div>
        )}
      </div>

      {settingsOpen && (
        <div className="settings-overlay">
          <div className="settings-modal">
            <h3>Update Profile</h3>
            <input
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Your name"
            />
            <input
              value={currentUser.avatar}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, avatar: e.target.value }))
              }
              placeholder="Avatar (emoji)"
            />
            <textarea
              value={currentUser.bio}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Bio"
            />
            <div className="settings-actions">
              <button onClick={() => setSettingsOpen(false)}>Save</button>
              <button onClick={() => setSettingsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChattingPage;
