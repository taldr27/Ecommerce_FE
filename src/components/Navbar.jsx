import { useContext, Fragment, useState } from "react";
import { Link, NavLink as RouterLink, useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Badge from "@mui/material/Badge";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/cartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeSession = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  return (
    <Disclosure as="nav" className="bg-blue-500 fixed z-20 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="">
                <div className="flex-shrink-0 items-center text-white">
                  <h2 className="font-kunstler text-2xl sm:text-5xl tracking-tight text-center text-white">
                    All-Fashion Market
                  </h2>
                </div>
              </div>
              <div className="hidden scustom:flex sm:ml-6">
                <div className="flex items-center gap-2">
                  <NavLink to="/" text="Home" />
                  <NavLink to="/products" text="Products" />
                  {user && <NavLink to="/mis-compras" text="My Purchases" />}
                  {user?.is_admin && (
                    <NavLink to="/ventas" text="View All Sales" />
                  )}
                  {user?.is_admin && (
                    <span className="text-gray-300">You are an admin!</span>
                  )}
                  {!user && <NavLink to="/register" text="Register" />}
                  {!user && <NavLink to="/login" text="Login" />}
                </div>
              </div>{" "}
              <div
                className={`inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 gap-5 ${
                  !user ? "scustom:hidden" : ""
                } `}
              >
                {user && (
                  <Link
                    to="/checkout"
                    className="relative rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <Badge badgeContent={cart.length} color="primary">
                      <i className="fa-solid fa-cart-shopping text-2xl text-white me-1"></i>
                    </Badge>
                  </Link>
                )}

                <div className="flex gap-4">
                  {user && (
                    <Menu>
                      <Menu.Button>
                        <i className="fa-solid fa-circle-user text-2xl text-white"></i>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                          <Menu.Item>
                            <span
                              className="bg-gray-100 cursor-pointer ps-1 text-sm"
                              onClick={closeSession}
                            >
                              Log Out
                            </span>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}

                  <div className="inset-y-0 left-0 flex items-center scustom:hidden">
                    <Disclosure.Button
                      className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      <span className="sr-only">Open menu</span>
                      {mobileMenuOpen ? (
                        <i className="fa-solid fa-xmark text-2xl"></i>
                      ) : (
                        <i className="fa-solid fa-bars text-2xl"></i>
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="scustom:hidden">
            <div
              className={`space-y-1 px-2 pb-3 pt-2 ${
                mobileMenuOpen ? "block" : "hidden"
              }`}
            >
              <NavLink to="/" text="Home" />
              <NavLink to="/products" text="Products" />
              {!user && <NavLink to="/register" text="Register" />}
              {!user && <NavLink to="/login" text="Login" />}
              {user && <NavLink to="/mis-compras" text="My Purchases" />}
              {user?.is_admin && <NavLink to="/ventas" text="View All Sales" />}
              {user?.is_admin && (
                <span className="text-white block rounded-md px-3 py-2 text-sm font-medium">
                  You are an admin!
                </span>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function NavLink({ to, text, children }) {
  return (
    <RouterLink
      to={to}
      className="text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-sm font-medium"
    >
      {text}
      {children}
    </RouterLink>
  );
}
