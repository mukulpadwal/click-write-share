import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { LoaderPinwheel } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getSession()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.error(error))
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 500)
      );
  }, []);

  return loading ? (
    <div className="border min-w-screen min-h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <LoaderPinwheel className="h-20 w-20 animate animate-ping text-[#EDC7B7]" />
      </div>
    </div>
  ) : (
    <div className="relative min-w-full min-h-screen">
      <Toaster />
      <Header />
      <main className="w-auto min-h-screen bg-[#EDC7B7] border border-black rounded-lg m-2 shadow-sm shadow-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
