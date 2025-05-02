import React, { useEffect, useState } from "react";
import {
  getReceivedInterests,
  getSentInterests,
  updateInterestStatus,
} from "../backend/interests";
import { getUserByUid } from "../backend/users";
import { auth } from "../firebase";
import { useLanguage } from "../locales/LanguageContext"; // ✅

import "../styels/SearchRequest.css";

const MyRequests = () => {
  const { t } = useLanguage(); // ✅
  const [sentUsers, setSentUsers] = useState([]);
  const [receivedUsers, setReceivedUsers] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      const uid = auth.currentUser.uid;

      try {
        const sent = await getSentInterests(uid);
        const sentProfiles = await Promise.all(
          sent.map(async (req) => {
            const user = await getUserByUid(req.toUid);
            return user ? { ...user, uid: req.toUid, status: req.status } : null;
          })
        );
        setSentUsers(sentProfiles.filter(Boolean));

        const received = await getReceivedInterests(uid);
        const receivedProfiles = await Promise.all(
          received.map(async (req) => {
            const user = await getUserByUid(req.fromUid);
            return user
              ? {
                  ...user,
                  uid: req.fromUid,
                  status: req.status,
                  docId: req.id,
                }
              : null;
          })
        );
        setReceivedUsers(receivedProfiles.filter(Boolean));
      } catch (err) {
        console.error("Error loading requests:", err.message);
      }
    };

    loadRequests();
  }, []);

  const handleUpdateStatus = async (docId, newStatus) => {
    try {
      await updateInterestStatus(docId, newStatus);
      setReceivedUsers((prev) =>
        prev.map((user) =>
          user.docId === docId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err.message);
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>{t("sent_requests_title")}</h2>
      {sentUsers.length === 0 ? (
        <p>{t("no_sent_requests")}</p>
      ) : (
        <div className="roommate-list">
          {sentUsers.map((user, index) => (
            <div key={index} className="roommate-card">
              <div className="roommate-header">
                <h3 className="roommate-name">{user.name}</h3>
              </div>
              <div className="roommate-details">
                <p>
                  <strong>{t("email")}:</strong> {user.email}
                </p>
                <p>
                  <strong>{t("status")}:</strong> {user.status || t("pending")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ margin: "40px 0 20px" }}>{t("received_requests_title")}</h2>
      {receivedUsers.length === 0 ? (
        <p>{t("no_received_requests")}</p>
      ) : (
        <div className="roommate-list">
          {receivedUsers.map((user, index) => (
            <div key={index} className="roommate-card">
              <div className="roommate-header">
                <h3 className="roommate-name">{user.name}</h3>
              </div>
              <div className="roommate-details">
                <p>
                  <strong>{t("email")}:</strong> {user.email}
                </p>
                <p>
                  <strong>{t("status")}:</strong> {user.status || t("pending")}
                </p>
              </div>
              {user.status === "pending" && (
                <div className="roommate-footer">
                  <button
                    className="details-button"
                    onClick={() => handleUpdateStatus(user.docId, "accepted")}
                  >
                    {t("accept")}
                  </button>
                  <button
                    className="details-button"
                    onClick={() => handleUpdateStatus(user.docId, "rejected")}
                    style={{ marginLeft: "10px", backgroundColor: "#e74c3c" }}
                  >
                    {t("reject")}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
