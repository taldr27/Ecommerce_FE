import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Container from "../components/Container";
import ListProducts from "../components/ListProducts";

export default function CheckOut() {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <Container>
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        // style={{
        //   backgroundImage: `url('https://images.vexels.com/media/users/3/214670/isolated/preview/64c660879366edf1716653aa5d84a17d-icono-de-trazo-de-caja-registradora.png')`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        //   opacity: 0.5,
        //   zIndex: -1,
        //   position: "fixed",
        //   width: "100%",
        //   height: "100%",
        // }}
      ></div>
      <h2>CheckOut</h2>
      <div className="grid grid-cols-1 md:grid-cols-2"></div>
      <div>
        <ListProducts products={cart} removeProduct={handleRemoveFromCart} />
      </div>
    </Container>
  );
}
