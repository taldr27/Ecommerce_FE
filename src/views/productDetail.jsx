import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { useParams } from "react-router-dom";
import useData from "../hooks/useAxios";
import Container from "../components/Container";
import ReactImageMagnifier from "simple-image-magnifier/react";
import { ToastContainer, toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, error, loading } = useData(
    `${import.meta.env.VITE_ENDPOINT_BASE}/products/detail/${id}`
  );

  const [colorSelected, setColorSelected] = useState(0);

  const { addProductToCart } = useContext(CartContext);

  const notify = () => toast(`${data.name} agregado al carrito 🛍️`);

  const handleAddProductToCart = (product) => {
    addProductToCart(product);
    notify();
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${data.imagen})`,
            backgroundSize: "cover",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <div className="w-75 mx-auto py-6 grid grid-cols-1 md:grid-cols-2">
          <img src={data.image} alt={data.name} className="w-full" />
          {/* <ReactImageMagnifier
              srcPreview={data.imagen}
              srcOriginal={data.imagen}
              width={500}
              //height={600}
              className="max-w-xs bg-gray-200 rounded-lg md:max-w-none max-h-80 md:max-h-none mx-auto"
            /> */}
          <div className="p-5">
            <h2 className="text-2x1 font-semibold mb-2">{data.name}</h2>
            <div className="grid grid-cols-2 ">
              <span className="text-gray-600">
                SKU:{" "}
                <b className="font font-semibold text-black">######{data.id}</b>
              </span>
              <span className="text-gray-600">
                Disponibilidad:{" "}
                <b className="font font-semibold text-green-500">Disponible</b>
              </span>
              <span className="text-gray-600">
                Marca: <b className="font font-semibold text-black">Estandar</b>
              </span>
              <span className="text-gray-600">
                Categoria:{" "}
                <b className="font font-semibold text-black">
                  {data?.category?.map((category) => (
                    <span key={category.name}>{category}{" "}</span>
                  ))}
                </b>
              </span>
            </div>
            <h3 className="font-semibold text-dark">Descripcion:</h3>
            <p className="text-black-600 mb-2">{data.descripcion}</p>
            <p className="text-blue-600 text-xl mb-2">
              Precio: S/ {data.price}
            </p>
            <p className="text-gray-500 text-lg mb-2">Stock: {data.stock}</p>
            <h3 className="font-semibold text-dark mb-2">Color:</h3>

            {data?.color?.length > 0 ? (
              data.color.map((color, i) => (
                <button
                  type="button"
                  key={color}
                  className="inline-block w-5 h-5 mr-2 rounded-full p-1"
                  style={{
                    background: color,
                    border: "1px solid lightgray",
                    ...(colorSelected === i
                      ? { outline: "4px solid gray" }
                      : { border: "" }),
                  }}
                  onClick={() => setColorSelected(i)}
                ></button>
              ))
            ) : (
              <p className="text-gray-500">No hay colores disponibles</p>
            )}

            <br />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() =>
                handleAddProductToCart({
                  ...data,
                  colorSelected: data.color[colorSelected],
                })
              }
            >
              Agregar al carro de compras
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
}
