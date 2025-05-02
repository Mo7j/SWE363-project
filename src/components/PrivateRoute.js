// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const PrivateRoute = ({ children, requiredRole }) => {
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!requiredRole) {
          setIsAllowed(true);
        } else {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const role = userDoc.data()?.role;
          setIsAllowed(role === requiredRole);
        }
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [requiredRole]);

  if (checking) return <div>Loading...</div>;

  return isAllowed ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
