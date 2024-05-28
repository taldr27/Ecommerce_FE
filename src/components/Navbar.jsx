import { useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Badge from "@mui/material/Badge";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { cart, totalcart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeSession = (setUser) => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  return (
    <Disclosure as="nav" className="bg-purple-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <i className="fa-solid fa-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-bars"></i>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 items-center text-white">
                  <h2 className="text-slate-700 font-kunstler text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
                    All-Fashion Market
                  </h2>
                </div>
              </div>
              <div className="hidden sm:flex sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Productos
                  </Link>
                  <Link
                    to="/mis-compras"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Mis compras
                  </Link>
                </div>
              </div>
              {user?.is_admin ? (
                <>
                  <Link
                    to="/ventas"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Ver todas las ventas
                  </Link>{" "}
                  <span className="text-gray-300">Eres admin!</span>
                </>
              ) : null}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!user ? (
                  <Link
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Registro
                  </Link>
                ) : null}
                {!user ? (
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white','rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                ) : null}

                {user ? (
                  <Link
                    to="/checkout"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <Badge badgeContent={cart.length} color="primary">
                      <i className="fa-solid fa-cart-shopping text-2xl text-gray-300 me-1"></i>
                    </Badge>
                  </Link>
                ) : null}
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button>
                      <i className="fa-solid fa-circle-user text-2xl text-gray-300 ms-4"></i>
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
                            onClick={() => closeSession(setUser)}
                          >
                            Cerrar sesión
                          </span>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : null}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white, block rounded-md px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-300 hover:bg-gray-700 hover:text-white, block rounded-md px-3 py-2 text-sm font-medium"
              >
                Productos
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white, block rounded-md px-3 py-2 text-sm font-medium"
              >
                Registro
              </Link>
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white, block rounded-md px-3 py-2 text-sm font-medium"
              >
                Login
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
