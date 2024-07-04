import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { useParams } from "react-router-dom";
import useData from "../hooks/useAxios";
import Container from "../components/Container";
import { ToastContainer, toast } from "react-toastify";
import ProductImageZoom from "../components/ProductImageZoom";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, error, loading } = useData(
    `${import.meta.env.VITE_ENDPOINT_BASE}/products/detail/${id}`
  );

  const [colorSelected, setColorSelected] = useState(0);

  const { addProductToCart } = useContext(CartContext);

  const notify = () => toast(`${data.name} added to the cart 🛍️`);

  const handleAddProductToCart = (product) => {
    addProductToCart(product);
    notify();
  };

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  }

  return (
    <Container>
      <div className="relative bg-gray-100 rounded-lg shadow-lg p-6">
        <div
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{
            backgroundImage: `url(${data.imagen})`,
            backgroundSize: "cover",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <div className="w-75 mx-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductImageZoom image={data.image} />
          <div className="p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4">{data.name}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <span className="text-gray-600">
                SKU: <b className="font-semibold text-black">###{data.id}</b>
              </span>
              <span className="text-gray-600">
                Availability:{" "}
                <b className="font-semibold text-green-500">
                  {data.stock > 0 ? "Available" : "Not available"}
                </b>
              </span>
              <span className="text-gray-600">
                Category:{" "}
                <b className="font-semibold text-black">
                  {data?.category?.map((category, id) => (
                    <span key={id}>{category} </span>
                  ))}
                </b>
              </span>
            </div>
            <h3 className="font-semibold text-lg text-dark mb-2">
              Description:
            </h3>
            <p className="text-black-600 mb-4">{data.description}</p>
            <p className="text-blue-600 text-xl mb-4">Price: ${data.price}</p>
            <p className="text-gray-500 text-lg mb-4">Stock: {data.stock}</p>
            <h3 className="font-semibold text-lg text-dark mb-2">Color:</h3>
            {data?.color?.length > 0 ? (
              <div className="flex space-x-2 mb-4 bg-gray-100 max-w-min">
                {data.color.map((color, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 ${
                      colorSelected === i
                        ? "border-gray-600"
                        : "border-gray-300"
                    }`}
                    style={{ background: color }}
                    onClick={() => setColorSelected(i)}
                  ></button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No colors available</p>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() =>
                handleAddProductToCart({
                  ...data,
                  colorSelected: data.color[colorSelected],
                })
              }
            >
              Add to shopping cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
}
