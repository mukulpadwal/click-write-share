import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ className = "" }: { className?: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <button onClick={handleLogout} className={` ${className}`}>
      Logout
    </button>
  );
}

export default LogoutBtn;
