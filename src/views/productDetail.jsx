import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { useNavigate, useParams } from "react-router-dom";
import useData from "../hooks/useAxios";
import Container from "../components/Container";
import { ToastContainer, toast } from "react-toastify";
import ProductImageZoom from "../components/ProductImageZoom";
import { AuthContext } from "../context/authContext";

export default function ProductDetail() {
  const { id } = useParams();
  const {
    data: fetchedData,
    error,
    loading,
  } = useData(`${import.meta.env.VITE_ENDPOINT_BASE}/products/detail/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [colorSelected, setColorSelected] = useState(0);
  const [data, setData] = useState(fetchedData);
  const { addProductToCart } = useContext(CartContext);
  const notify = () => toast(`${data.name} added to the cart 🛍️.`);

  const handleAddProductToCart = (product) => {
    if (user) {
      addProductToCart(product);
      notify();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  const handleDeleteProduct = async (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("delete", product);
      try {
        await axios.delete(
          `${import.meta.env.VITE_ENDPOINT_BASE}/products/delete/${product.id}`
        );
        setData((prevData) => ({
          ...prevData,
          stock: 0,
          is_active: false,
        }));
      } catch (error) {
        toast.error(`Error deleting product 🤯 ${error.response.data.error}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-225px)] flex justify-center items-center bg-blue-400">
        <span className="text-4xl text-white">Loading...</span>
      </div>
    );
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
          <div className="p-5 bg-white rounded-lg shadow-md h-fit my-auto">
            <h2 className="text-3xl font-semibold mb-4">{data.name}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <span className="text-gray-600">
                SKU: <b className="font-semibold text-black">###{data.id}</b>
              </span>
              <span className="text-gray-600">
                Availability:{" "}
                {data.stock > 0 && data.is_active ? (
                  <span className="font-semibold text-green-500">
                    Available
                  </span>
                ) : (
                  <span className="font-semibold text-red-500">
                    Not available
                  </span>
                )}
              </span>
              <span className="text-gray-600">
                Category:{" "}
                <b className="font-semibold text-black">
                  {data?.category?.map((category, id) => (
                    <span key={id}>#{category} </span>
                  ))}
                </b>
              </span>
            </div>
            <h3 className="font-semibold text-lg text-dark mb-2">
              Description:
            </h3>
            <p className="text-black-600 mb-4">{data.description}</p>
            <p className="text-blue-600 text-xl mb-4">Price: S/ {data.price}</p>
            <p className="text-gray-500 text-lg mb-4">
              Stock: {data.stock <= 0 || !data.is_active ? "0" : data.stock}
            </p>
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
            {data.is_active ? (
              <div className="flex gap-5">
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
                {user?.is_admin && (
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                    onClick={() => handleDeleteProduct(data)}
                  >
                    Delete Product
                  </button>
                )}
              </div>
            ) : (
              <p>Product not available!</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
}
