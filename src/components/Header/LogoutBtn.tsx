import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function LogoutBtn({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        toast.success("Successfully Logged Out...");
        setTimeout(() => {
          navigate("/");
        }, 100);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <button
      onClick={handleLogout}
      className={` ${className}`}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate animate-spin" /> : "Logout"}
    </button>
  );
}

export default LogoutBtn;
