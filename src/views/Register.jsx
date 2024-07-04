import { useContext, useState } from "react";
import Container from "../components/Container";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const startRegister = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register",
        {
          email,
          password,
          name,
          document_type: documentType,
          document_number: documentNumber,
          is_admin: isAdmin,
        }
      );
      return response;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  const handleRegister = async () => {
    try {
      const response = await startRegister();
      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      setUser(response.data.user);
      toast.success("Registration successful 👍");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      toast.error("User registration error 🤯");
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)]">
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="lg:w-1/3 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col md:mr-4 w-full mt-8 md:mt-10 mx-auto">
            <h2 className="text-gray-800 text-lg font-medium title-font mb-4">
              Register a New Account
            </h2>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white focus:ring-2 focus:ring-blue-500 rounded border border-gray-300 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white focus:ring-2 focus:ring-blue-500 rounded border border-gray-300 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. example@gmail.com"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white focus:ring-2 focus:ring-blue-500 rounded border border-gray-300 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. 8161csda188sd@"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="documentType"
                className="leading-7 text-sm text-gray-700"
              >
                Document Type:
              </label>
              <select
                id="documentType"
                name="documentType"
                className="w-full bg-white focus:ring-2 focus:ring-blue-500 rounded border border-gray-300 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="">Select Document Type</option>
                <option value="DNI">DNI</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="documentNumber"
                className="leading-7 text-sm text-gray-700"
              >
                Document Number:
              </label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                className="w-full bg-white focus:ring-2 focus:ring-blue-500 rounded border border-gray-300 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder="e.g. 12345678"
              />
            </div>
            <div className="relative mb-4 flex items-center">
              <label
                htmlFor="isAdmin"
                className="leading-7 text-sm text-gray-700"
              >
                Is Admin?
              </label>
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                className="ml-2 leading-7 text-sm text-gray-700"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <button
              className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="text-xs mt-2">
              *Password must be at least 6 characters long.
            </p>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col md:ml-4 w-full mt-8 md:mt-10 mx-auto">
            <h2 className="text-gray-800 text-lg font-medium title-font mb-4">
              Join Us Today!
            </h2>
            <p className="leading-relaxed mb-4">
              Register to get an account and enjoy all our exclusive services
              and benefits.
            </p>
            <p className="text-xs">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
}
