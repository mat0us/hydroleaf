"use client";

import { useState } from "react";
import { loginUser } from "../../lib/auth";
import { auth } from "../../../../firebaseConfig";
import { useRouter } from "next/navigation";
import Modal from "../../components/ModalProps";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(auth, email, password);

      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p style={{ color: "red" }}>{error}</p>
      </Modal>

      <form onSubmit={handleLogin} className="space-y-1 p-2">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold font-medium leading-6 text-gray-900"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        <div className="pt-3">
          <button type="submit" className="buttonSub">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
