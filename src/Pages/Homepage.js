import React from "react";
import { useHistory } from "react-router";

const Homepage = () => {
  const history = useHistory();
  return (
    <div className="h-screen flex flex-col justify-center bg-gradient-to-b from-gray-900 via-gray-500 to-gray-300">
      <p className="md:mx-96 rounded-2xl py-12 bg-gray-900 bg-opacity-60 text-6xl text-white text-center font-extrabold">
        Welcome to the slot game site.
        <br /> Please register to play or login to continue
      </p>
      <div className="mx-auto">
        <button
          onClick={() => history.push("/signup")}
          className="bg-gray-900 text-white px-12 py-6 m-12 text-4xl rounded transition duration-500 transform hover:bg-gray-300 hover:text-black"
        >
          SignUp
        </button>
        <button
          onClick={() => history.push("/login")}
          className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded transition duration-500 transform hover:bg-gray-900 hover:text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Homepage;
