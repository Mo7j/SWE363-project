import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRequests } from "../backend/requests";
import { sendRoommateInterest, getSentInterests } from "../backend/interests";
import { auth } from "../firebase";
import { useLanguage } from "../locales/LanguageContext";
import "../styels/SearchRequest.css";

const SearchRequest = () => {
  const { t } = useLanguage();
  const [roommatesData, setRoommatesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const [filterPreference, setFilterPreference] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [sentUids, setSentUids] = useState(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRequests();
        setRoommatesData(data);

        if (auth.currentUser) {
          const sent = await getSentInterests(auth.currentUser.uid);
          const uids = sent.map((r) => r.toUid);
          setSentUids(new Set(uids));
        }
      } catch (err) {
        console.error("Failed to load data:", err.message);
      }
    };
    fetchData();
  }, []);

  const filteredRoommates = roommatesData.filter((roommate) => {
    return (
      auth.currentUser?.uid !== roommate.uid &&
      (roommate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roommate.major?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roommate.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCity ? roommate.city === filterCity : true) &&
      (filterMajor ? roommate.major === filterMajor : true) &&
      (filterPreference ? roommate.smoking === filterPreference : true)
    );
  });

  const openModal = (roommate) => {
    setSelectedRoommate(roommate);
    setIsModalOpen(true);
    setRequestStatus("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoommate(null);
    setRequestStatus("");
  };

  const handleChatClick = () => {
    navigate("/chatting");
  };

  const handleSendRequest = async () => {
    try {
      if (!auth.currentUser || !selectedRoommate?.uid) {
        setRequestStatus(t("error_missing_user"));
        return;
      }

      await sendRoommateInterest({
        fromUid: auth.currentUser.uid,
        toUid: selectedRoommate.uid,
      });

      setRequestStatus(t("request_sent_success"));
      setSentUids((prev) => new Set(prev).add(selectedRoommate.uid));
    } catch (err) {
      setRequestStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="search-bar-div">
        <input
          type="text"
          placeholder={t("search_placeholder")}
          className="input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <select className="select" onChange={(e) => setFilterCity(e.target.value)}>
          <option value="">{t("select_city")}</option>
          <option value="Dhahran">{t("dhahran")}</option>
          <option value="Alkhobar">{t("alkhobar")}</option>
        </select>

        <select className="select" onChange={(e) => setFilterMajor(e.target.value)}>
          <option value="">{t("select_major")}</option>
          <option value="ICS">ICS</option>
          <option value="Engineering">{t("engineering")}</option>
        </select>

        <select className="select" onChange={(e) => setFilterPreference(e.target.value)}>
          <option value="">{t("smoking")}</option>
          <option value="no">{t("non_smoking")}</option>
          <option value="yes">{t("smoker")}</option>
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
              <p className="roommate-details-p">{t("major")}: {roommate.major}</p>
              <p className="roommate-details-p">{t("email")}: {roommate.email}</p>
              <p className="roommate-details-p">{t("city")}: {roommate.city}</p>
              <p className="roommate-details-p">{t("smoking")}: {roommate.smoking}</p>
            </div>
            <div className="roommate-footer">
              <button className="details-button" onClick={() => openModal(roommate)}>
                {t("view_details")}
              </button>
              <button className="details-button" onClick={handleChatClick}>
                {t("chat")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRoommate && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-header-h2">{t("roommate_details")}</h2>
              <button onClick={closeModal} className="colse-icon">X</button>
            </div>
            <div className="modal-body">
              <p><strong>{t("name")}:</strong> {selectedRoommate.name}</p>
              <p><strong>{t("email")}:</strong> {selectedRoommate.email}</p>
              <p><strong>{t("major")}:</strong> {selectedRoommate.major}</p>
              <p><strong>{t("age")}:</strong> {selectedRoommate.age}</p>
              <p><strong>{t("city")}:</strong> {selectedRoommate.city}</p>
              <p><strong>{t("smoking")}:</strong> {selectedRoommate.smoking}</p>
              <p><strong>{t("building")}:</strong> {selectedRoommate.building}</p>
              <p><strong>{t("details")}:</strong> {selectedRoommate.details}</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleSendRequest}
                className="close-btn"
                disabled={sentUids.has(selectedRoommate.uid)}
              >
                {sentUids.has(selectedRoommate.uid) ? t("already_sent") : t("send_request")}
              </button>
              {requestStatus && (
                <p style={{ marginTop: "10px", color: requestStatus.includes("✅") ? "green" : "red" }}>
                  {requestStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRequest;
