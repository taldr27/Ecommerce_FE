import { createContext, useState, useEffect } from "react";
import { getStorage, saveStorage, removeStorage } from "../utils/localstorage";

const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);

  console.log(cart, "cart");

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]); // Reinicia el estado del carrito a un array vacío
    removeStorage("cart");
  };

  const addProductToCart = (product) => {
    const existsIndex = cart.findIndex((prod) => prod.id === product.id);
    if (existsIndex === -1) {
      product.cantidad = 1;
      setCart([...cart, product]);
    } else {
      if (Number(product.stock) === cart[existsIndex].cantidad) {
        return;
      }
      const copyCart = [...cart];
      copyCart[existsIndex].cantidad++;
      setCart(copyCart);
    }
  };

  const totalCart = cart.reduce((acc, prod) => acc + prod.cantidad, 0);

  useEffect(() => {
    const storageCart = getStorage("cart");
    if (storageCart) {
      setCart(storageCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      saveStorage("cart", cart);
    }
  }, [cart]);

  const createSale = (totalCompra, userId) => {
    const saleDetails = cart.map((product) => ({
      quantity: product.cantidad,
      product_id: product.id,
      price: product.price.toString(),
      subtotal: (product.price * product.cantidad).toString(),
    }));

    const saleData = {
      sale_details: saleDetails,
      total_price: totalCompra.toString(),
      user_id: userId,
    };

    return fetch(`${import.meta.env.VITE_ENDPOINT_BASE}/sales/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleData),
    }).then((response) => response.json());
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        clearCart,
        removeFromCart,
        addProductToCart,
        totalCart,
        createSale,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
