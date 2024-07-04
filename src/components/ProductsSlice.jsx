/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductsSlice({
  data,
  colums = 4,
  showMoreLink = true,
}) {
  const location = useLocation();
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
      <div className="mb-3 flex justify-between items-end">
        {showMoreLink && location.pathname === "/" && (
          <>
            {" "}
            <h2 className="text-2xl title-font font-medium border-b-2 border-blue-500">
              Selected Products
            </h2>
            <Link to="/products" className="text-gray-500 font-semibold">
              View More<span className="text-blue-500">{" > "}</span>
            </Link>
          </>
        )}
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        {data.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
