import React, { useState, useEffect, useRef } from "react";
import "../styels/chattingPage.css"; 

const ChattingPage = () => {
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const chatBoxRef = useRef(null);

  const users = [
    { id: 1, name: "John Doe", avatar: "JD" },
    { id: 2, name: "Jane Smith", avatar: "JS" },
    { id: 3, name: "Mike Johnson", avatar: "MJ" },
    { id: 4, name: "Ali Hassan", avatar: "AH" },
    { id: 5, name: "Sara Khan", avatar: "SK" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = () => {
    if (input.trim() !== "" && selectedUser !== null) {
      const newMessage = {
        user: selectedUser.name,
        text: input,
        time: formatTime(),
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser.id]: [
          ...(prevMessages[selectedUser.id] || []),
          newMessage,
        ],
      }));

      setInput("");
    }
  };

  const formatTime = () => {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleNewChat = () => {
    setSelectedUser(null);
    setMessages({});
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);

  return (
    <div className="chat-container">
      <div className="user-list">
        <div className="chat-header">
          <h2>Users</h2>
          <input
            type="text"
            className="search-box"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="users">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`}
                onClick={() => handleUserSelect(user)}
              >
                <div className="user-avatar">{user.avatar}</div>
                <div>{user.name}</div>
              </div>
            ))
          ) : (
            <div className="no-results">No users found</div>
          )}
        </div>
      </div>

      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h2>Chat with {selectedUser.name}</h2>
              <button className="chat-header-btn" onClick={handleNewChat}>
                New Chat
              </button>
            </div>

            <div className="chat-box" ref={chatBoxRef}>
              {messages[selectedUser.id]?.map((msg, idx) => (
                <div key={idx} className="chat-message">
                  <div className="message-avatar">{selectedUser.avatar}</div>
                  <div className="message-content">
                    <div className="message-text">{msg.text}</div>
                    <div className="message-time">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
              />
              <button className="send-btn" onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">
            <h3>Select a user to start chatting</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChattingPage;
