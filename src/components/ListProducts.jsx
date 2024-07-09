import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function ListProducts({ products, removeProduct }) {
  const { cart, clearCart, createSale } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const totalCompra = products.reduce(
    (suma, product) => suma + product.price * product.cantidad,
    0
  );

  const user = useContext(AuthContext);
  const userId = user.user.user_id;

  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    createSale(totalCompra, userId)
      .then((data) => {
        console.log("Sale created:", data);
        setShowPopup(true);
        clearCart();
      })
      .catch((error) => {
        console.error("Error creating sale:", error);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate();
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {products.length > 0 &&
          products.map((product) => (
            <li key={product.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={product.image}
                  alt={product.name}
                />
                <div className="min-w-0 flex-auto">
                  <h3 className="font-semibold leading-6 text-gray-900">
                    {product.name}
                  </h3>
                  <div className="flex mt-1 text-sm leading-6 text-gray-600">
                    <p>Color seleccionado: </p>
                    <div
                      className="mt-1 ms-1 rounded-full w-4 h-4"
                      style={{ backgroundColor: product.colorSelected }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 font-semibold text-gray-900">
                  Total: S/ {product.price * product.cantidad}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  P.U: S/ {product.price}, Cant.: {product.cantidad} Unid.
                </p>
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="mt-2 text-sm leading-5 text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        {products.length === 0 && (
          <>
            <li className="flex justify-between gap-x-6 py-5">
              <p className="font-bold text-lg">
                You don&apos;t have any products in your cart yet.
              </p>
            </li>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Buy more products
            </button>
          </>
        )}
        {products.length > 0 && (
          <li className="flex justify-between gap-x-6 py-5">
            <p className="font-bold text-lg">Total:</p>
            <p className="font-semibold text-lg">S/ {totalCompra.toFixed(2)}</p>
          </li>
        )}
      </ul>

      <div className="flex justify-between items-center">
        {products.length > 0 && (
          <>
            {" "}
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Vaciar carrito
            </button>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Realizar pago
            </button>
          </>
        )}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-lg text-gray-800">Pago realizado</p>
              <button
                onClick={closePopup}
                className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
