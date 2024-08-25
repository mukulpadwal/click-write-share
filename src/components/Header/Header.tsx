import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuSquare, X } from "lucide-react";

function Header() {
  const [mobileMenuClicked, setMobileMenuClicked] = useState<boolean>(false);
  const authStatus: boolean = useSelector(
    (state: any) => state?.auth?.isLoggedIn
  );
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Blogs",
      slug: "/all-blogs",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Blog",
      slug: "/add-blog",
      active: authStatus,
    },
  ];

  return (
    <header className="relative w-auto h-auto border border-black rounded-lg m-2 shadow-md shadow-black bg-[#EEE2DC]">
      <Container className="p-2 w-full">
        <nav className="w-auto flex flex-row justify-between items-center gap-2">
          <div className="w-auto">
            <Link to="/">
              <Logo className="w-14" />
            </Link>
          </div>

          <div className="hidden sm:block ">
            <ul className="flex flex-wrap flex-row items-center justify-center gap-3">
              {navItems.map((item) =>
                item.active ? (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      isActive
                        ? "decoration-[#AC3B61] underline underline-offset-4 inline-bock px-6 py-2"
                        : "px-6 py-2"
                    }
                  >
                    {item.name}
                  </NavLink>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn className="bg-[#AC3B61] text-white px-6 py-2 rounded-full" />
                </li>
              )}
            </ul>
          </div>

          <div className="w-full flex flex-row justify-end items-center sm:hidden z-50">
            {!mobileMenuClicked ? (
              <MenuSquare
                onClick={() => setMobileMenuClicked(!mobileMenuClicked)}
                className="h-10 w-10"
              />
            ) : (
              <div className="w-full flex flex-row justify-between items-center">
                <p className="font-bold text-lg">Click-Write-Share</p>
                <X
                  onClick={() => setMobileMenuClicked(!mobileMenuClicked)}
                  className="h-9 w-9 border-[3.5px] border-black rounded-md"
                />
              </div>
            )}
          </div>

          {mobileMenuClicked && (
            <div className="sm:hidden border border-black shadow-slate-600 shadow-lg rounded-md absolute left-0 right-0 top-0 bottom-0 w-auto h-screen z-40  bg-[#EDC7B7] flex justify-center items-center">
              <ul className="w-full flex flex-col justify-center items-center gap-4">
                {navItems.map((item) =>
                  item.active ? (
                    <li
                      key={item.name}
                      className="w-full flex flex-row justify-center items-center"
                    >
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMobileMenuClicked(!mobileMenuClicked);
                        }}
                        className="text-center w-5/6 border border-[#AC3B61] py-2 rounded-full"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li
                    onClick={() => {
                      setMobileMenuClicked(!mobileMenuClicked);
                    }}
                    className="w-full flex flex-row justify-center items-center"
                  >
                    <LogoutBtn className="text-center w-5/6 bg-[#AC3B61] text-white  py-2 rounded-full" />
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
