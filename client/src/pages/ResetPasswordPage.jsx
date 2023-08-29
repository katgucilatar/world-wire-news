import { useState } from "react"; // Don't forget to import useState
import { useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { RESET_PASSWORD } from "../utils/mutations";

function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleReset = async () => {
    try {
      const { data } = await resetPassword({
        variables: { token, newPassword },
      });
      if (data && data.resetPassword && data.resetPassword.success) {
        navigate("/login");
      } else {
        console.error(
          "Reset password failed: ",
          (data && data.resetPassword && data.resetPassword.message) ||
            "No message provided."
        );
      }
    } catch (err) {
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
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPasswordPage;
