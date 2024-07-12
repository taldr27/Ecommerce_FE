/* eslint-disable react/prop-types */
import { useState } from "react";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black"];
  const categoryOptions = ["Electronics", "Clothing", "Books", "Toys", "Food"];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    color: "",
    stock: "",
    review: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const updatedFormData = { ...formData, image: file };
    setFormData(updatedFormData);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        `${import.meta.env.VITE_ENDPOINT_BASE}/products/upload-image`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data.image_url;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.description ||
        !formData.price ||
        !formData.image ||
        !formData.color.length ||
        !formData.stock ||
        !formData.review ||
        !formData.category.length
      ) {
        setError("Please fill all the fields!");
        setTimeout(() => setError(""), 4000);
        return;
      } else if (formData.image) {
        setLoading(true);
        const imageUrl = await uploadImage(formData.image);
        const updatedFormData = { ...formData, image: imageUrl };
        const reviewArray =
          typeof updatedFormData.review === "string"
            ? [updatedFormData.review]
            : updatedFormData.review;
        updatedFormData.review = reviewArray;
        const response = await fetch(
          `${import.meta.env.VITE_ENDPOINT_BASE}/products/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
          }
        );
        if (response.ok) {
          setLoading(false);
          const newProduct = await response.json();
          onAddProduct(newProduct);
          setFormData({
            name: "",
            description: "",
            price: "",
            image: "",
            color: [],
            stock: "",
            review: [],
            category: [],
          });
          onClose();
        } else {
          setLoading(false);
          setError("Error adding product. Please try again.", response);
          console.error("Error adding product:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        color: [...prevFormData.color, selectedColor],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        color: prevFormData.color.filter((color) => color !== selectedColor),
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: [...prevFormData.category, selectedCategory],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: prevFormData.category.filter(
          (category) => category !== selectedCategory
        ),
      }));
    }
  };

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-auto ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="modal-overlay absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-0"
        onClick={() => {
          onClose();
          setError("");
        }}
      ></div>
      <div className="modal-container bg-white w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 max-w-[525px] rounded shadow-lg z-[1] max-h-[calc(100vh-2.5rem)] overflow-y-auto">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              *Name:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description*:
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              *Price:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              name="price"
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  handleInputChange(e);
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              *Image:
            </label>
            <input
              className="max-w-full"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="color"
            >
              *Color:
            </label>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color, index) => (
                <div key={index}>
                  <label>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value={color}
                      checked={formData.color.includes(color)}
                      onChange={handleColorChange}
                    />
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              *Stock:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="text"
              name="stock"
              value={formData.stock}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  handleInputChange(e);
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="review"
            >
              *Review (one per line):
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              *Category:
            </label>
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map((category, index) => (
                <div key={index}>
                  <label>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value={category}
                      checked={formData.category.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs py-1">* Indicates a required field.</p>
          <div className="flex flex-row-reverse justify-between items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
              type="submit"
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
            <span className="text-red-500 font-semibold ml-2">{error}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
