import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD } from "../utils/mutations";
// import { useCurrentUserContext } from '../context/CurrentUser';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [resetEmail, setResetEmail] = useState("");
  const [resetFeedback, setResetFeedback] = useState(null);

  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  const handleForgotPassword = async () => {
    console.log("Email to reset:", resetEmail);

    try {
      console.log("Sending password reset request for:", resetEmail);
      const { data } = await forgotPassword({
        variables: { email: resetEmail },
      });

      if (data.forgotPassword.success) {
        setResetFeedback(data.forgotPassword.message);
        // Navigate to the login page after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setResetFeedback("Failed to send reset email. Please try again!");
      }
    } catch (err) {
      console.error("Error resetting password:", err.message || err);
      setResetFeedback("An error occurred. Please try again!");
    }
  };

  return (
    <>
      <div className="bg-newsGray p-6 rounded mx-4 h-5/6 my-5">
        <h1 className="text-3xl text-center mb-3 font-bold mt-4">World Wire</h1>
        <h2 className="text-center text-2xl mb-3">Forgot Your Password?</h2>
        <p className="text-center mb-4">
          Enter your email address and we will send you instructions to reset
          your password.
        </p>
        <input
          placeholder="Enter your email"
          type="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <button
          className="bg-newsBlue text-white p-2 rounded hover:bg-blue-600 mt-4 w-full mb-5"
          onClick={handleForgotPassword}
        >
          Send Reset Email
        </button>

        <p className="font-bold text-center">
          <Link to="/login"> Back to Log in </Link>
        </p>

        {resetFeedback && <p className="text-center mt-4">{resetFeedback}</p>}
      </div>
    </>
  );
}
