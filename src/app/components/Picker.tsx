"use client";

import React, { useState } from "react";
import SignIn from "../auth/signin/page";
import SignUp from "../auth/signup/page";

const Picker: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>("signin");

  return (
    <div>
      <div>
        <button onClick={() => setSelectedForm("signin")}>
          Sign In
        </button>
        <button onClick={() => setSelectedForm("signup")}>
          Sign Up
        </button>
      </div>

      {/* Render the form based on the selected value */}
      {selectedForm === "signin" ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Picker;
