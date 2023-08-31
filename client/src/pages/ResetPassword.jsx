import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { RESET_PASSWORD } from "../utils/mutations";

function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleReset = async () => {
    try {
      const { data } = await resetPassword({
        variables: { token, newPassword },
      });
      if (data && data.resetPassword && data.resetPassword.success) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(
          (data && data.resetPassword && data.resetPassword.message) ||
            "Reset password failed."
        );
      }
    } catch (err) {
      setMessage("Error resetting password.");
      console.error("Error resetting password: ", err);
    }
  };

  return (
    <div>
      <input
        placeholder="Enter new password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset} disabled={!newPassword.trim()}>
        Reset Password
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPasswordPage;
