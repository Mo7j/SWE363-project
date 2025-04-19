import React, { useState, useRef, useEffect } from "react";
import "./chattingPage.css";

const defaultUsers = [
  { name: "John", avatar: "👨‍💼", bio: "Software Engineer" },
  { name: "Jane", avatar: "👩‍💻", bio: "UI/UX Designer" },
  { name: "Mike", avatar: "🧑‍🔧", bio: "Backend Developer" },
];

function ChattingPage() {
  const [currentUser, setCurrentUser] = useState({
    name: "You",
    avatar: "🙂",
    bio: "Frontend Dev",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(currentUser);
  const messageEndRef = useRef(null);

  // Scroll to bottom on new messages or user switch
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, selectedUser]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = () => {
    if (message.trim() === "" || !selectedUser) return;

    const newMessage = {
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatHistory((prev) => {
      const updated = { ...prev };
      if (!updated[selectedUser.name]) updated[selectedUser.name] = [];
      updated[selectedUser.name].push({ sender: "me", ...newMessage });
      return updated;
    });

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const filteredUsers = defaultUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openSettings = () => {
    setTempSettings(currentUser);
    setShowSettings(true);
  };

  const saveSettings = () => {
    setCurrentUser(tempSettings);
    setShowSettings(false);
  };

  return (
    <div className="chat-page">
      <div className="sidebar">
        <div className="settings-header">
          <div className="current-user">
            <span className="avatar">{currentUser.avatar}</span>
            <span>{currentUser.name}</span>
          </div>
          <button className="settings-btn" onClick={openSettings}>⚙️</button>
        </div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="user-list">
          {filteredUsers.map((user) => (
            <div
              key={user.name}
              className={`user ${selectedUser?.name === user.name ? "active" : ""}`}
              onClick={() => setSelectedUser(user)}
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
              <span className="avatar">{selectedUser.avatar}</span>
              {selectedUser.name}
            </div>
            <div className="chat-messages">
              {(chatHistory[selectedUser.name] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.sender === "me" ? "sent" : "received"}`}
                >
                  <div className="bubble">{msg.text}</div>
                  <div className="msg-header">{msg.time}</div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-user">Select a user to start chatting</div>
        )}
      </div>

      {showSettings && (
        <div className="settings-overlay">
          <div className="settings-modal">
            <h3>Edit Profile</h3>
            <input
              value={tempSettings.name}
              onChange={(e) =>
                setTempSettings({ ...tempSettings, name: e.target.value })
              }
              placeholder="Your name"
            />
            <input
              value={tempSettings.avatar}
              onChange={(e) =>
                setTempSettings({ ...tempSettings, avatar: e.target.value })
              }
              placeholder="Your avatar (emoji)"
            />
            <textarea
              value={tempSettings.bio}
              onChange={(e) =>
                setTempSettings({ ...tempSettings, bio: e.target.value })
              }
              placeholder="Your bio"
            />
            <div className="settings-actions">
              <button onClick={() => setShowSettings(false)}>Cancel</button>
              <button onClick={saveSettings}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChattingPage;
