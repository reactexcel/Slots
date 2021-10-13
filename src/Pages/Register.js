import React, { useState } from "react";
import { useHistory } from "react-router";

const SignUp = () => {
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    email: "",
    date: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleFormValues = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const getAge = () => {
    var today = new Date();
    var birthDate = new Date(formValues.date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const checkPassword = () => {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
      formValues.password
    );
    return pattern;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let authentication = true;
    let age = getAge();
    if (age < 18) {
      authentication = false;
      setError("date");
    }
    if (!checkPassword()) {
      authentication = false;
      setError("password");
    }
    if (authentication) {
      history.push("/login");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-gradient-to-b from-gray-900 via-gray-500 to-gray-300">
      <div>
        <div className="flex justify-center">
          <div className="md:w-1/3 w-full mx-auto text-center bg-white rounded p-8">
            <p className="text-4xl font-semibold">SignUp</p>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-2 my-4 border-none">
                <label>Email: </label>
                <input
                  className="border-b-2 px-4"
                  type="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={(e) => handleFormValues("email", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 my-4 border-none">
                <label>Date of birth: </label>
                <input
                  className="border-b-2 px-4"
                  type="date"
                  placeholder="Date of Birth"
                  value={formValues.date}
                  onChange={(e) => handleFormValues("date", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 my-4 border-none">
                <label>Password: </label>
                <input
                  className="border-b-2 px-4"
                  type="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={(e) => handleFormValues("password", e.target.value)}
                  required
                />
              </div>
              {error === "password" ? (
                <div className="grid grid-cols-2 my-4 border-none">
                  <p></p>
                  <p className="text-xs text-red-600">
                    Password should contain atleast 8 characters, 1 Uppercase, 1
                    Lowercase and 1 numeric value
                  </p>
                </div>
              ) : (
                error === "date" && (
                  <div className="grid grid-cols-2 my-4 border-none">
                    <p></p>
                    <p className="text-xs text-red-600">
                      Age should be more than 18 to register
                    </p>
                  </div>
                )
              )}
              <button
                type="submit"
                className="bg-gray-900 text-white py-2 px-4 m-8 rounded transition duration-500 transform hover:bg-gray-300 hover:text-black"
              >
                SignUp
              </button>
            </form>
            <div>
              <p className="text-xs text-gray-500">Already a Member?</p>
              <button
                onClick={() => history.push("/login")}
                className="bg-gray-300 text-black py-2 px-4 rounded transition duration-500 transform hover:bg-gray-900 hover:text-white"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
