import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [authUser] = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpenIndex, setSubMenuOpenIndex] = useState(null);
  const [mobileSubMenuOpenIndex, setMobileSubMenuOpenIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setSubMenuOpenIndex(subMenuOpenIndex === index ? null : index);
  };

  const toggleMobileSubMenu = (index) => {
    setMobileSubMenuOpenIndex(mobileSubMenuOpenIndex === index ? null : index);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setSubMenuOpenIndex(null);
    setMobileSubMenuOpenIndex(null);
  };

  const [menuItems, setMenuItems] = useState([]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:4002/navigation/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
      // fallback to default menu
      setMenuItems([
        { title: "Home", link: "/" },
        {
          title: "Course",
          subMenu: [
            { title: "Java", link: "/course/java" },
            { title: "Python", link: "/course/python" },
            { title: "Dot Net", link: "/course/dotnet" },
            { title: "React", link: "/course/react" },
          ],
        },
        { title: "Contact", link: "/contact" },
        { title: "About", link: "/about" },
        { title: "Cart", link: "/cart" },
      ]);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Add a manual refresh button for menu
  const refreshMenu = async () => {
    await fetchMenu();
  };

  const navItems = menuItems.map((item, index) => {
    if (item.subMenu && item.subMenu.length > 0) {
      return (
        <li key={index} tabIndex={0} className="relative group">
          <a
            className="justify-between flex items-center cursor-pointer"
            onClick={() => toggleSubMenu(index)}
          >
            {item.title}
            <svg
              className="fill-current ml-1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
            </svg>
          </a>
          <ul
            className={`p-2 absolute left-0 top-full shadow-lg rounded-md border border-gray-600 rounded-box w-40 transition-all duration-300 z-50 ${
              subMenuOpenIndex === index ? "block" : "hidden"
            } group-hover:block`}
            style={{
              backgroundColor:
                subMenuOpenIndex === index
                  ? theme === "dark"
                    ? "#1E293B"
                    : "#F2F2F2"
                  : theme === "dark"
                  ? "#1E293B"
                  : "#F2F2F2",
            }}
          >
            {item.subMenu.map((subItem, subIndex) => (
              <li key={subIndex}>
                <a
                  href={subItem.link}
                  onClick={closeMenus}
                  className="hover:bg-pink-500 hover:text-white"
                >
                  {subItem.title}
                </a>
              </li>
            ))}
          </ul>
        </li>
      );
    } else {
      return (
        <li key={index}>
          <a href={item.link || "#"} onClick={closeMenus}>
            {item.title}
          </a>
        </li>
      );
    }
  });

  return (
    <>
      <div
        className={` max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 ${
          sticky
            ? "sticky-navbar shadow-md bg-base-200 dark:bg-slate-700 dark:text-white duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown relative">
              <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 transition-all duration-300 ease-in-out ${
                  menuOpen ? "block" : "hidden"
                }`}
                style={{ backgroundColor: theme === "dark" ? "#0F172A" : "var(--base-100)" }}
              >
                {menuItems.map((item, index) => (
                  <li key={index} tabIndex={0} className="relative group">
                    {item.subMenu && item.subMenu.length > 0 ? (
                      <>
                        <a
                          className="justify-between flex items-center cursor-pointer"
                          onClick={() => toggleMobileSubMenu(index)}
                        >
                          {item.title}
                          <svg
                            className="fill-current ml-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                          </svg>
                        </a>
                        <ul
                          className={`p-2 shadow rounded-box w-full transition-all duration-300 ${
                            mobileSubMenuOpenIndex === index ? "block" : "hidden"
                          } group-hover:block`}
                          style={{ backgroundColor: theme === "dark" ? "#1E293B" : "#DCDDDF" }}
                        >
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a
                                href={subItem.link}
                                onClick={closeMenus}
                                className="hover:bg-pink-500 hover:text-white"
                              >
                                {subItem.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <a href={item.link || "#"} onClick={closeMenus}>
                        {item.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <a className=" text-2xl font-bold cursor-pointer">bookStore</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="hidden md:block">
              <label className=" px-3 py-2 border rounded-md flex items-center gap-2">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            {/* Removed Admin Menu button as per request */}
            {/* {authUser && window.location.pathname !== "/" && window.location.pathname !== "/admin" && window.location.pathname !== "/adminpanel" && window.location.pathname !== "/login" && (
                <button
                  onClick={() => window.location.href = "/adminpanel"}
                  className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Admin Menu
                </button>
              )} */}
              {authUser && window.location.pathname === "/adminpanel" && (
                <button
                  onClick={() => {
                    // Add your logout logic here, e.g., clear auth tokens, redirect, etc.
                    window.location.href = "/logout";
                  }}
                  className="hidden fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
            <label className="swap swap-rotate flex items-center space-x-3">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  checked={theme === "dark"}
                  onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                />
                {/* sun icon */}
                <svg
                  className="swap-off fill-current w-7 h-7 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64 17.657 4 16.013l1.64-1.644a7.975 7.975 0 0 1 0-11.314L4 1.41 5.64-.234l1.644 1.64a7.975 7.975 0 0 1 11.314 0l1.644-1.64L21.59 1.41l-1.64 1.64a7.975 7.975 0 0 1 0 11.314l1.64 1.644-1.644 1.644-1.644-1.644a7.975 7.975 0 0 1-11.314 0z" />
                </svg>
                {/* moon icon */}
                <svg
                  className="swap-on fill-current w-7 h-7 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.75 15.5a9 9 0 1 1-11.25-11.25 7.5 7.5 0 0 0 11.25 11.25z" />
                </svg>
              </label>
              {authUser ? (
                <div className="flex items-center space-x-2 ml-2">
                  <span className="btn btn-outline btn-sm dark:bg-transparent dark:text-white dark:border-white">
                    {authUser.fullname}
                  </span>
                  <button
                    onClick={() => {
                      localStorage.removeItem("Users");
                      window.location.href = "/";
                    }}
                    className="btn btn-outline btn-sm hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white dark:bg-transparent dark:text-white dark:border-white"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => window.location.href = "/cartdetails"}
                  className="btn btn-outline btn-sm ml-2 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white dark:bg-transparent dark:text-white dark:border-white"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
