// src/backend/users.js
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// ✅ Get the current user's profile
export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// ✅ Update the current user's profile
export const updateUserProfile = async (uid, data) => {
  if (
    !data ||
    !data.name?.trim() ||
    !data.bio?.trim()
  ) {
    throw new Error("Invalid profile data");
  }

  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    name: data.name.trim(),
    bio: data.bio.trim(),
  });
};

// ✅ NEW: Get any user by UID (for displaying others in requests)
export const getUserByUid = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};
