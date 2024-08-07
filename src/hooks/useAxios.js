import { useState, useEffect } from "react";
import axios from "axios";

/**
 *
 * @param {*} url donde sera el endpoint al que quiero hacer la petición
 * @param {*} options va a ser un objeto donde puedo indicar el metodo y si hay data de por medio a enviar
 * @returns data(datos de mi peticion), error, loading(boolean), refetch(función para solicitar de nuevo la data)
 */

const useData = (url, options = { method: "get", data: null }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios({ url, ...options });
      setData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError({ message: "No products found!" });
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      fetchData();
    };
    getData();
  }, [url, options.method, options.data]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
};

export default useData;
