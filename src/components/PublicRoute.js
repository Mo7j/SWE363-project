// src/components/PublicRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const PublicRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const role = userDoc.data()?.role;
        setRedirectPath(role === "admin" ? "/admin" : "/search-request");
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) return <div>Loading...</div>;

  return redirectPath ? <Navigate to={redirectPath} /> : children;
};

export default PublicRoute;
