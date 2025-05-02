// src/backend/requests.js
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const createRoommateRequest = async (data) => {
  const ref = await addDoc(collection(db, "requests"), {
    uid: data.uid,
    name: data.name,
    email: data.email,
    major: data.major || "",
    age: data.age || "",
    city: data.city || "",
    smoking: data.smoking || "",
    building: data.building || "",
    details: data.details || "",
    timestamp: new Date(),
  });
  return ref.id;
};
export const getAllRequests = async () => {
    const snapshot = await getDocs(collection(db, "requests"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getRequestsByUser = async (uid) => {
    const q = query(collection(db, "requests"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
