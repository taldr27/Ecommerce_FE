/* eslint-disable react/prop-types */
import { useContext, Fragment } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Badge from "@mui/material/Badge";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/cartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
                    <NavLink to="/sales" text="View All Sales" />
                  )}
                  {user?.is_admin && (
                    <span className="text-gray-300">You are an admin!</span>
                  )}
                  {!user && <NavLink to="/register" text="Register" />}
                  {!user && <NavLink to="/login" text="Login" />}
                </div>
              </div>
              <div
                className={`inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 gap-5 ${
                  !user ? "scustom:hidden" : ""
                } `}
              >
                {user && (
                  <RouterNavLink
                    to="/checkout"
                    className="relative rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <Badge badgeContent={cart.length} color="primary">
                      <i className="fa-solid fa-cart-shopping text-2xl text-white me-1"></i>
                    </Badge>
                  </RouterNavLink>
                )}

                <div className="flex gap-4">
                  {user && (
                    <Menu>
                      <MenuButton>
                        <i className="fa-solid fa-circle-user text-2xl text-white"></i>
                      </MenuButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-9 w-48 origin-top-right rounded-md p-2 bg-white shadow-lg ring-1 ring-black ring-opacity-5 hover:bg-slate-200">
                          <MenuItem>
                            <span
                              className="cursor-pointer pl-4 text-sm w-full h-full"
                              onClick={closeSession}
                            >
                              Log Out
                            </span>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  )}
                  <div className="inset-y-0 left-0 flex items-center scustom:hidden">
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <i className="fa-solid fa-xmark text-2xl"></i>
                      ) : (
                        <i className="fa-solid fa-bars text-2xl"></i>
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DisclosurePanel className="scustom:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink to="/" text="Home" />
              <NavLink to="/products" text="Products" />
              {!user && <NavLink to="/register" text="Register" />}
              {!user && <NavLink to="/login" text="Login" />}
              {user && <NavLink to="/mis-compras" text="My Purchases" />}
              {user?.is_admin && <NavLink to="/sales" text="View All Sales" />}
              {user?.is_admin && (
                <span className="text-white block rounded-md px-3 py-2 text-sm font-medium">
                  You are an admin!
                </span>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

function NavLink({ to, text }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `text-white block rounded-md px-3 py-2 text-sm font-medium ${
          isActive ? "bg-gray-800" : ""
        } hover:bg-gray-700`
      }
    >
      {text}
    </RouterNavLink>
  );
}
