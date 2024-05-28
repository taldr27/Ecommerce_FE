import { useContext, useState } from "react";
import Container from "../components/Container";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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
      const response = await axios.post("http://127.0.0.1:8000/api/user/register", {
        email,
        password,
        name,
        document_type: documentType,
        document_number: documentNumber,
        is_admin: isAdmin
      });
      console.log("Response", response);
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
      console.log(response.data, "dataaaaaaaaa");
      toast.success('Registro exitoso 👍');
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      toast.error('Error en el registro del usuario 🤯');
    }
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="lg:w-1/3 md:w-1/2 bg-gray-400 bg-opacity-50 rounded-lg p-4 flex flex-col md:mr-auto w-full mt-8 md:mt-10 mx-auto">
            <h2 className="text-dark text-lg font-medium title-font mb-3">
              Registra una cuenta nueva
            </h2>
            <div className="relative mb-2">
              <label htmlFor="name" className="leading-7 text-sm text-gray-700">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white focus:ring-2 focus:ring-blue-600 rounded border border-gray-600 text-base outline-none py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div className="relative mb-2">
              <label htmlFor="email" className="leading-7 text-sm text-gray-700">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white focus:ring-2 focus:ring-blue-600 rounded border border-gray-600 text-base outline-none py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej. ejemplo@gmail.com"
              />
            </div>
            <div className="relative mb-2">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white focus:ring-2 focus:ring-blue-700 rounded border border-gray-600 text-base outline-none py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ej. 8161csda188sd@"
              />
            </div>
            <div className="relative mb-2">
              <label htmlFor="documentType" className="leading-7 text-sm text-gray-700">
                Tipo de Documento:
              </label>
              <input
                type="text"
                id="documentType"
                name="documentType"
                className="w-full bg-white focus:ring-2 focus:ring-blue-600 rounded border border-gray-600 text-base outline-none py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                placeholder="Ej. DNI"
              />
            </div>
            <div className="relative mb-2">
              <label htmlFor="documentNumber" className="leading-7 text-sm text-gray-700">
                Número de Documento:
              </label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                className="w-full bg-white focus:ring-2 focus:ring-blue-600 rounded border border-gray-600 text-base outline-none py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder="Ej. 12345678"
              />
            </div>
            <div className="relative mb-2">
              <label htmlFor="isAdmin" className="leading-7 text-sm text-gray-700">
                ¿Es administrador?
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
              Registrarse
            </button>
            <p className="text-xs mt-2">
              *La contraseña debe ser de al menos 6 caracteres.
            </p>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-gray-300 bg-opacity-50 rounded-lg p-4 flex flex-col md:ml-auto w-full mt-8 md:mt-10 mx-auto">
            <h2 className="text-dark text-lg font-medium title-font mb-3">
              ¡Únete a nosotros hoy mismo!
            </h2>
            <p className="leading-relaxed mb-3">
              Regístrate para obtener una cuenta y disfruta de todos nuestros servicios y beneficios exclusivos.
            </p>
            <p className="text-xs">
              ¿Ya tienes una cuenta? <a href="/login" className="text-blue-500">Inicia sesión aquí</a>
            </p>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
}
