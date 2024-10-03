"use client";

import React, { useState } from "react";
import { registerUser } from "../../lib/auth";
import { auth } from "../../../../config/firebaseConfig";
import { useRouter } from "next/navigation";
import Modal from "../../components/ModalProps";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setIsModalOpen(true);
      return;
    }

    try {
      await registerUser(auth, email, password, name);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p style={{ color: "red" }}>{error}</p>
      </Modal>

      <form onSubmit={handleSignUp} className="space-y-1 p-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold font-medium leading-6 text-label"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold font-medium leading-6 text-label"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold font-medium leading-6 text-label"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="passwordAgain"
            className="block text-sm font-semibold font-medium leading-6 text-label"
          >
            Repeat password
          </label>
          <input
            id="passwordAgain"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="input"
          />
        </div>

        <div className="pt-3">
          <button type="submit" className="buttonSub">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
