"use client";

import React, { useState } from "react";
import SignIn from "../auth/signin/page";
import SignUp from "../auth/signup/page";

const Picker: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>("signup");

  return (
    <div className="flex flex-col md:flex-row shadow-neon rounded-lg">
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center bg-white w-full md:w-1/2 md:p-4 rounded-lg md:rounded-l-lg">
        <div className="flex flex-row m-1">
          <button
            onClick={() => setSelectedForm("signup")}
            className={`button button-left ${selectedForm === "signup" ? "button-active" : "button-inactive"} ml-1`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setSelectedForm("signin")}
            className={`button button-right ${selectedForm === "signin" ? "button-active" : "button-inactive"} mr-1`}
          >
            Sign In
          </button>
        </div>

        {/* Render the form based on the selected value */}
        {selectedForm === "signup" ? <SignUp /> : <SignIn />}
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-green-600 justify-center items-center rounded-r-lg md:rounded-r-lg">
        <img
          src="/ilustration.svg"
          alt="illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Picker;
