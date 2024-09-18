import Link from "next/link";
import Navbar from "./components/Navbar";
import Picker from "./components/Picker";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav>
        <Navbar />
      </nav>

      <div className="flex-grow flex items-center justify-center px-4">
        <Picker />
      </div>
    </div>
  );
}
