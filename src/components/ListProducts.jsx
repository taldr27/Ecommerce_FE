import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function ListProducts({ products, removeProduct }) {
  const { cart, clearCart, createSale } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const user = useContext(AuthContext);
  const userId = user.user.user_id;

  const totalCompra = products.reduce(
    (suma, product) => suma + product.price * product.cantidad,
    0
  );
  const igv = totalCompra * 0.18;
  const totalConIgv = totalCompra + igv;

  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    createSale(totalConIgv, userId)
      .then((data) => {
        setPdfUrl(data.pdf_url);
        setShowPopup(true);
        clearCart();
      })
      .catch((error) => {
        console.error("Error creating sale:", error);
      })
      .finally(() => {
        setIsProcessing(false);
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
                  Total: S/ {(product.price * product.cantidad).toFixed(2)}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Unit Price: S/ {product.price}, Cant.: {product.cantidad}{" "}
                  Unid.
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
              <p className="font-bold text-lg">Your cart is empty.</p>
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
          <div className="flex flex-col">
            <div className="border-b-[1px]">
              <li className="flex justify-between gap-x-6 mt-2">
                <p className="font-bold text-lg">Subtotal:</p>
                <p className="font-semibold text-lg">
                  S/ {totalCompra.toFixed(2)}
                </p>
              </li>
              <li className="flex justify-between gap-x-6">
                <p className="font-bold text-lg">IGV (18%):</p>
                <p className="font-semibold text-lg">S/ {igv.toFixed(2)}</p>
              </li>
            </div>
            <li className="flex justify-between gap-x-6 py-4">
              <p className="font-bold text-lg">Total:</p>
              <p className="font-semibold text-lg">
                S/ {totalConIgv.toFixed(2)}
              </p>
            </li>
          </div>
        )}
      </ul>

      <div className="flex justify-between items-center">
        {products.length > 0 && (
          <>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Empty Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? "Processing..." : "Checkout"}
            </button>
          </>
        )}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-md flex flex-col">
              <p className="text-lg text-gray-800">Payment Successful</p>
              <div className="flex flex-col">
                {" "}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
                >
                  View Receipt (PDF) (Spanish)
                </a>
                <button
                  onClick={closePopup}
                  className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-block"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
