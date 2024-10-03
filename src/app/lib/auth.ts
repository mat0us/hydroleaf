// lib/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, Auth, updateProfile } from "firebase/auth";

import { ref, get, set, child } from "firebase/database";
import { auth, db } from "../../../config/firebaseConfig";

// Pomocná funkce pro formátování data
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const getUserName = async (userId: string) => {
  const userRef = ref(db);
  const snapshot = await get(child(userRef, `users/${userId}`));
  if (snapshot.exists()) {
    const userData = snapshot.val();
    return userData.name;
  } else {
    console.error("No data available for user.");
    return null;
  }
};

// Funkce pro registraci uživatele
export const registerUser = async (auth: Auth, email: string, password: string, name: string) => {
  // Vytvoření uživatele
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Aktualizace profilu uživatele
  await updateProfile(user, { displayName: name });

  // Ukládání dat do Realtime Database
  const now = new Date();
  const formattedDate = formatDate(now);

  const userData = {
    name: name,
    email: email,
    last_logged_in: formattedDate,
    last_logged_out: formattedDate, // aktualizace při odhlášení
  };

  const userRef = ref(db, `users/${user.uid}`);
  await set(userRef, userData);

  return user; // můžeš vrátit uživatele nebo jiné informace
};

// Funkce pro přihlášení
export const loginUser = async (auth: Auth, email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Funkce pro resetování hesla
export const resetPassword = async (auth: Auth, email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

// Funkce pro odhlášení
export const logoutUser = async (auth: Auth) => {
  return await signOut(auth);
};
