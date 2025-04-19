import React, { useState, useEffect, useRef } from "react";
import "../styels/chattingPage.css";

const defaultUser = {
  name: "You",
  avatar: "🙂",
  bio: "Hey there! I am using ChatApp.",
};

const initialUsers = [
  { name: "Mohammed", avatar: "👨🏻", bio: "Busy" },
  { name: "Turki", avatar: "👨🏼", bio: "Available" },
  { name: "Thamer", avatar: "👨🏽", bio: "In a meeting" },
  { name: "Abdulrahman", avatar: "👨🏾", bio: "At work" },
  { name: "Ajmi", avatar: "👨🏿", bio: "Sleeping" },
];

export default function ChattingPage() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;
    const newMsg = {
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => {
      const updated = { ...prev };
      updated[selectedUser.name] = [...(updated[selectedUser.name] || []), newMsg];
      return updated;
    });
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    const { nickname, avatar, bio } = e.target.elements;
    setCurrentUser({
      name: nickname.value || currentUser.name,
      avatar: avatar.value || currentUser.avatar,
      bio: bio.value || currentUser.bio,
    });
    setShowSettings(false);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-page">
      <div className="sidebar">
        <div className="settings-header">
          <div className="current-user">
            <span className="avatar">{currentUser.avatar}</span>
            <span>{currentUser.name}</span>
          </div>
          <button className="settings-btn" onClick={() => setShowSettings(true)}>
            ⚙️
          </button>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          className="search-bar"
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
              {(messages[selectedUser.name] || []).map((msg, idx) => (
                <div key={idx} className="message sent">
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
                onKeyDown={handleKeyPress}
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
          <form className="settings-modal" onSubmit={handleSettingsSubmit}>
            <h3>Edit Profile</h3>
            <input name="nickname" placeholder="Enter nickname" />
            <input name="avatar" placeholder="Enter emoji avatar" />
            <textarea name="bio" placeholder="Enter bio..." rows="3" />
            <div className="settings-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowSettings(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
