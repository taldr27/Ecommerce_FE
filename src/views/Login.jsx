import { useContext, useState } from "react";
import Container from "../components/Container";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const startLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT_BASE}/user/login`,
        {
          email,
          password,
        }
      );
      setIsLoading(false);
      return response;
    } catch (error) {
      console.log(error, "1111");
      setIsLoading(false);
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await startLogin();
      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      setUser(response.data.user);
      toast.success("Login successful 👍");
      navigate("/");
    } catch (error) {
      toast.error(
        `Error logging into user account 🤯 ${error.response.data.error}`
      );
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-blue-100 min-h-[calc(100vh-80px)]">
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-8 md:mt-10 mx-auto"
        >
          <h2 className="text-gray-800 text-lg font-medium title-font mb-5">
            Enter Your User Details
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-700">
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
          <button
            className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
            type="submit"
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
          <p className="text-xs mt-3">
            *Password must be at least 6 characters long.
          </p>
          <p className="text-sm mt-3 text-center">
            Don&apos;t have an account? Create a new account{" "}
            <button
              onClick={handleNavigateToRegister}
              className="text-blue-500 hover:underline"
            >
              here
            </button>
          </p>
        </form>
        <ToastContainer />
      </Container>
    </div>
  );
}
