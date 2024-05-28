/* eslint-disable react/prop-types */
import useData from "../hooks/useAxios";
import { Link, useLocation  } from "react-router-dom"
import ProductCard from "./ProductCard";

export default function ProductsSlice({data, colums = 4, showMoreLink = true}) {

  const location = useLocation();
  console.log(data);
 // console.log("variable entorno", import.meta.env.VITE_ENDPOINT_BASE)
  /*const {data, error, isLoading} = useData (`${import.meta.env.VITE_ENDPOINT_BASE}/productos`);
  if(isLoading){
    return <p>Cargando...</p>
  }

  if(error){
    return <p>Error: {error}</p>
  }
  */
  return (
    <section className="container mx-auto p-4">
      <div className="mb-3 flex justify-between">
      <h2 className="text-lg font-semibold border-b-2 border-blue-500">Productos seleccionados</h2>
      {showMoreLink && location.pathname === "/" && (
          <Link to="/products" className="text-gray-500 font-semibold">Ver mas<span className="text-blue-500">{" > "}</span></Link>
        )}
      </div>
    <div className={`grid grid-cols-1 sm:grid-cols-${colums-2} md:grid-cols-${colums-1} lg:grid-cols-${colums} xl:grid-cols-5 gap-4`}>
        {data.map(product => (
            <div key={product.id}><ProductCard product={product}/></div>
        ))}
    </div>
    </section>
  )
 
}
