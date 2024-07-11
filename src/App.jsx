import { Routes, Route, useLocation } from "react-router-dom";
import { CartContextProvider } from "./context/cartContext";
import Navbar from "./components/Navbar";
import Home from "./views/home";
import AllProducts from "./views/AllProducts";
import ProductDetail from "./views/productDetail";
import CheckOut from "./views/checkOut";
import Register from "./views/Register";
import Login from "./views/Login";
import { AuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MisCompras from "./views/MisCompras";
import Ventas from "./views/Ventas";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  const shouldHideFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      <AuthContextProvider>
        <CartContextProvider>
          <div className="flex-1">
            <Navbar />
            <div className="pt-[80px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/detail/:id" element={<ProductDetail />} />
                <Route
                  path="/checkOut"
                  element={
                    <ProtectedRoute>
                      <CheckOut />
                    </ProtectedRoute>
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/mis-compras"
                  element={
                    <ProtectedRoute>
                      <MisCompras />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sales"
                  element={
                    <ProtectedRoute>
                      <Ventas />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </CartContextProvider>
      {shouldHideFooter ? null : <Footer />}
      </AuthContextProvider>
    </div>
  );
}
