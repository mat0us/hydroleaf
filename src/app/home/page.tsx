"use client"; 

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { logoutUser, getUserName } from "../lib/auth";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const name = await getUserName(uid);
        setUserName(name);
        setLoading(false);
      } else {
        router.push("/auth/signup");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(auth);
      router.push("/auth/signin"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Ukazatel načítání, pokud se data načítají
  }

  return (
    <div>
      <h1>Welcome, {userName ? userName : "User"}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
