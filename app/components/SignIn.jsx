"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SigninButton = () => {
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSignOut = () => {
    signOut();
    setShowOptions(false);
  };

  return (
    <div className="relative">
      {session && session.user ? (
        <>
          <div
            className="absolute top-4 right-4 flex items-center cursor-pointer"
            onClick={toggleOptions}
          >
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2">{session.user.name}</span>
          </div>
          {showOptions && (
            <div className="absolute top-full right-0 bg-white shadow rounded mt-1">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => signIn()}
          className="absolute right-4 top-4 bg-main-pink py-1 px-2 border-2 rounded-md border-black"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default SigninButton;
