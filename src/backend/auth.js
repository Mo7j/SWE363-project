// src/backend/auth.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Handles login and role fetching
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    return { user, role: userData?.role };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Handles signup and role fetching
export const signupWithEmailAndPassword = async ({ name, email, password }) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
  
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role: "student", // default role
      bio: "",
    });
  
    return user;
  };