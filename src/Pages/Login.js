import React, { useState } from "react";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";

const query = gql`
  mutation GetPlayerMutation($email: String!, $password: String!) {
    getPlayer(email: $email, password: $password)
  }
`;

const Login = () => {
  const [getPlayer, { loading }] = useMutation(query);
  const history = useHistory();
  const [formValues, setFormValues] = useState({});
  const handleFormValues = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPlayer({
      variables: {
        email: formValues.email,
        password: formValues.password,
      },
    })
      .then((response) => {
        console.log(response?.data?.getPlayer, "register_response");
        localStorage.setItem("id", response?.data?.getPlayer);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error, "register_response");
      });
    // history.push("/dashboard");
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-gradient-to-b from-gray-900 via-gray-500 to-gray-300">
      <div>
        <div className="flex justify-center">
          <div className="md:w-1/3 w-full mx-auto text-center bg-white rounded p-8">
            <p className="text-4xl font-semibold">Login</p>
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
              <button
                type="submit"
                className="bg-gray-900 text-white m-6 py-2 px-4 rounded transition duration-500 transform hover:bg-gray-300 hover:text-black"
                disabled={loading}
              >
                {loading ? "Please Wait" : "Login"}
              </button>
            </form>
            <div>
              <p className="text-xs text-gray-500">Not a Member yet?</p>
              <button
                onClick={() => history.push("/signup")}
                className="bg-gray-300 text-black py-2 px-4 rounded transition duration-500 transform hover:bg-gray-900 hover:text-white"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
