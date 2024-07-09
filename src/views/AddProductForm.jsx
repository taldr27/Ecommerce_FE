import { useState } from "react";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black"];
  const categoryOptions = ["Electronics", "Clothing", "Books", "Toys", "Food"];

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
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.image) {
        const imageUrl = await uploadImage(formData.image);
        const updatedFormData = { ...formData, image: imageUrl };
        const reviewArray =
          typeof updatedFormData.review === "string"
            ? [updatedFormData.review]
            : updatedFormData.review;
        updatedFormData.review = reviewArray;
        const response = await fetch(
          `${import.meta.VITE_ENDPOINT_BASE}/products/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
          }
        );
        if (response.ok) {
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

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-auto ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 z-0"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white w-96 p-4 rounded shadow-lg z-[1]">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
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
              Description
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
              Price
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div className="mb-4 flex flex-wrap gap-3">
            {colorOptions.map((color, index) => (
              <div key={index}>
                <label>
                  <input
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="review"
            >
              Review (one per line)
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-4 flex flex-wrap gap-3">
            {categoryOptions.map((category, index) => (
              <div key={index}>
                <label>
                  <input
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
