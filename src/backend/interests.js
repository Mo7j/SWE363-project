import { db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

// ✅ Send new request (with status)
export const sendRoommateInterest = async ({ fromUid, toUid }) => {
  const q = query(
    collection(db, "roommate_interests"),
    where("fromUid", "==", fromUid),
    where("toUid", "==", toUid)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("You've already sent a request to this user.");
  }

  await addDoc(collection(db, "roommate_interests"), {
    fromUid,
    toUid,
    timestamp: new Date(),
    status: "pending",
  });
};

// ✅ Get all requests sent by current user
export const getSentInterests = async (fromUid) => {
  const q = query(collection(db, "roommate_interests"), where("fromUid", "==", fromUid));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Get all requests received by current user
export const getReceivedInterests = async (toUid) => {
  const q = query(collection(db, "roommate_interests"), where("toUid", "==", toUid));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ New: Update request status
export const updateInterestStatus = async (docId, newStatus) => {
  const ref = doc(db, "roommate_interests", docId);
  await updateDoc(ref, { status: newStatus });
};
