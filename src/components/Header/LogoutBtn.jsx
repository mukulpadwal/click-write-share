import React from "react";
import { useDispatch } from "react-redux";
import appwriteAuthService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispath = useDispatch();

  const handleLogout = () => {
    appwriteAuthService
      .logout()
      .then(() => {
        dispath(logout());
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
