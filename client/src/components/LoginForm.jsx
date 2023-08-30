import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { LOGIN_USER, FORGOT_PASSWORD } from "../utils/mutations";

import { useCurrentUserContext } from "../context/CurrentUser";

export default function Login() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetFeedback, setResetFeedback] = useState(null);

  const [login, { error }] = useMutation(LOGIN_USER);
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const { token, user } = mutationResponse.data.login;
      loginUser(user, token);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleForgotPassword = async () => {
    try {
      const { data } = await forgotPassword({
        variables: { email: resetEmail },
      });
      if (data.forgotPassword.success) {
        setResetFeedback(data.forgotPassword.message);
      } else {
        setResetFeedback("Failed to send reset email. Please try again!");
      }
    } catch (err) {
      console.error("There was an issue resetting the password: ", err);
      setResetFeedback("An error occurred. Please try again!");
    }
  };

  return (
    <>
      {error ? (
        <div>
          <p className="error-text">The provided credentials are incorrect</p>
        </div>
      ) : null}
      <form
        id="login-form"
        onSubmit={handleFormSubmit}
        className="bg-gray-100 p-6 rounded"
      >
        <h2 className="text-2xl mb-10">Login</h2>
        <label htmlFor="email" className="block mb-2">
          Email:
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label htmlFor="password" className="block mb-2">
          Password:
          <input
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
        >
          Login
        </button>
        <p>
          Need an account? Sign up <Link to="/register">here</Link>
        </p>
        <p>
          <button onClick={() => setShowForgotPassword(true)}>
            Forgot Password
          </button>
        </p>
      </form>

      {showForgotPassword && (
        <div>
          <input
            placeholder="Enter your email"
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <button onClick={handleForgotPassword}>Send Reset Email</button>
          <p>{resetFeedback}</p>
        </div>
      )}
    </>
  );
}
