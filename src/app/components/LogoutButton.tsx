import { logoutUser } from "../lib/auth";
import { auth } from "../../../firebaseConfig";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser(auth);
      // Přesměrování po úspěšném odhlášení
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
