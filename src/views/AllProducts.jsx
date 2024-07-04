import { useState, useEffect, useContext } from "react";
import useData from "../hooks/useAxios";
import ProductsSlice from "../components/ProductsSlice";
import Container from "../components/Container";
import Slider from "@mui/material/Slider";
import { filterDataByPrice, filterDataByCategories } from "../utils/changeData";
import AddProductModal from "./AddProductForm";
import { AuthContext } from "../context/authContext";

export default function AllProducts() {
  const [price, setPrice] = useState([1, 10000]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({
    Hombre: false,
    Mujer: false,
    Accesorios: false,
    Deporte: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);

  console.log(user, currentUser, "asdasd91200");

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { data, error, isLoading } = useData(
    `${import.meta.env.VITE_ENDPOINT_BASE}/products/all`
  );

  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };

  const handleCategoryFilter = (category) => {
    setCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleFilter = () => {
    const categoriesSelected = Object.entries(categories)
      .filter(([, isSelected]) => isSelected)
      .map(([category]) => category);

    if (categoriesSelected.length === 0) {
      setProducts(data);
    } else {
      const filteredData = filterDataByCategories(data, categoriesSelected);
      setProducts(filteredData);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    const filteredData = filterDataByPrice(data, price[0], price[1]);
    setProducts(filteredData);
  }, [price]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/859675534/es/vector/mano-dibuja-la-ropa-de-las-mujeres-ilustraci%C3%B3n-de-vector-sobre-fondo-blanco-patr%C3%B3n.jpg?s=612x612&w=0&k=20&c=iEQkTwdBqtJa0cpYxCN5EUIKtYjc0MEbwqd4y7Wo4bU=')`,
        }}
      ></div>
      <Container>
        <h2 className="text-3xl font-bold pb-3">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow">
              {showFilters && (
                <>
                  <h3 className="text-lg font-semibold border-b-2 border-blue-500 mt-4">
                    Filters:
                  </h3>
                  <h4 className="text-md font-semibold border-b-2 mt-3">
                    Price:
                  </h4>
                  <Slider
                    getAriaLabel={() => "Precio"}
                    value={price}
                    onChange={handlePrice}
                    valueLabelDisplay="auto"
                    min={1}
                    max={150}
                  />
                  <h4 className="text-lg font-semibold mt-3">Categories:</h4>
                  {Object.keys(categories).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilter(category)}
                      className={`bg-${
                        categories[category] ? "blue-500" : "blue-100"
                      } hover:bg-${
                        categories[category] ? "blue-900" : "blue-100"
                      } text-black font-bold py-2 px-4 rounded mb-2 w-full`}
                      style={{ display: "block" }}
                    >
                      {category}
                    </button>
                  ))}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleFilter}
                  >
                    Apply Filter
                  </button>
                </>
              )}
              {currentUser?.is_admin && (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={toggleModal}
                  >
                    Add Product
                  </button>
                  <AddProductModal
                    isOpen={showModal}
                    onClose={toggleModal}
                    onAddProduct={handleAddProduct}
                  />
                </>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <ProductsSlice data={products} columns={3} />
          </div>
        </div>
      </Container>
    </div>
  );
}
