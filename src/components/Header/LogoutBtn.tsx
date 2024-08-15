import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({ className = "" }: { className?: string }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
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
