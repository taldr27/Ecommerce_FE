import { useState, useEffect, useContext } from "react";
import useData from "../hooks/useAxios";
import ProductsSlice from "../components/ProductsSlice";
import Container from "../components/Container";
import Slider from "@mui/material/Slider";
import { filterDataByPrice, filterDataByCategories } from "../utils/changeData";
import AddProductModal from "./AddProductForm";
import { AuthContext } from "../context/authContext";
import { useLocation } from "react-router-dom";

export default function AllProducts() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryValue = queryParams.get("search");
  const [currentUser, setCurrentUser] = useState(user);
  const endpointBase = `${import.meta.env.VITE_ENDPOINT_BASE}/products/all`;
  const url = categoryValue
    ? `${endpointBase}?search=${categoryValue}`
    : endpointBase;

  const { data, loading } = useData(url);
  const [price, setPrice] = useState([1, 10000]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({
    Men: false,
    Women: false,
    Accessories: false,
    Sports: false,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    const filteredData = filterDataByPrice(data, price[0], price[1]);
    setProducts(filteredData);
  }, [price, data]);

  useEffect(() => {
    const categoriesSelected = Object.entries(categories)
      .filter(([, isSelected]) => isSelected)
      .map(([category]) => category);

    if (categoriesSelected.length === 0) {
      setProducts(data);
    } else {
      const filteredData = filterDataByCategories(data, categoriesSelected);
      setProducts(filteredData);
    }
  }, [categories, data]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };

  const handleCategoryFilter = (category) => {
    setCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // const handleFilter = () => {
  //   const categoriesSelected = Object.entries(categories)
  //     .filter(([, isSelected]) => isSelected)
  //     .map(([category]) => category);

  //   if (categoriesSelected.length === 0) {
  //     setProducts(data);
  //   } else {
  //     const filteredData = filterDataByCategories(data, categoriesSelected);
  //     setProducts(filteredData);
  //   }
  // };

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  let content;
  if (loading) {
    content = <p className="text-4xl">Loading...</p>;
  } else if (data.length === 0) {
    content = <p className="text-3xl">No products found!</p>;
  } else {
    content = <ProductsSlice data={products} columns={3} />;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full min-h-[calc(100vh-80px)] h-full opacity-20 z-[-1]"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/859675534/es/vector/mano-dibuja-la-ropa-de-las-mujeres-ilustraci%C3%B3n-de-vector-sobre-fondo-blanco-patr%C3%B3n.jpg?s=612x612&w=0&k=20&c=iEQkTwdBqtJa0cpYxCN5EUIKtYjc0MEbwqd4y7Wo4bU=')`,
        }}
      ></div>
      <Container>
        <h2 className="text-4xl pb-3">
          {`${
            categoryValue
              ? categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)
              : "All"
          }`}{" "}
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            {categoryValue ? null : (
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mt-4">Filters:</h3>
                <h4 className="text-md font-semibold mt-3">Price Range:</h4>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={price}
                  onChange={handlePrice}
                  valueLabelDisplay="auto"
                  min={1}
                  max={250}
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
                <div className="flex flex-col">
                  {currentUser?.is_admin && (
                    <>
                      <button
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
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
            )}
          </div>
          <div className="col-span-12 md:col-span-9">{content}</div>
        </div>
      </Container>
    </div>
  );
}
