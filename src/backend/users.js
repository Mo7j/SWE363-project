// src/backend/users.js
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Get user profile
export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// Update user profile with validation
export const updateUserProfile = async (uid, data) => {
  if (
    !data ||
    !data.name?.trim() ||
    !data.email?.endsWith("@kfupm.edu.sa") ||
    !data.bio?.trim()
  ) {
    throw new Error("Invalid profile data");
  }

  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    name: data.name.trim(),
    email: data.email.trim(),
    bio: data.bio.trim(),
  });
};
