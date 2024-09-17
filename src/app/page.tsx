import Link from "next/link";
import Navbar from "./components/Navbar";
import Picker from "./components/Picker";

export default function Home() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
 
      <Picker />
    </div>
  );
}
