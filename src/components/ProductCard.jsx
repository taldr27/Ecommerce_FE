import { Link } from "react-router-dom";


export default function ProductCard({ product: { nombre, precio, stock, imagen, id, categoria } }) {
  return (
    <Link to={`/detail/${id}`}>
      <div className="border border-gray-400 bg-pink-100 mb-4 relative rounded-md group-transition">
        <div className="w-full h- full rounded-md overflow-hidden item-center justify-center relative">
          <img src={imagen} className="w-full h-64 group-hover:scale-110 " alt={nombre} />

          <div className="absolute top-0 right-0 bg-yellow-200 text-black p-2">
            {stock} Units.
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-md text-black font-semibold mb-2">{nombre}</h4>
          <p className="text-sm text-black">S/ {precio}</p>
          <div className="flex flex-col">
            {categoria && categoria.length > 0 ? (
              <>
                {categoria.map((cat, i) => (
                  <span key={i} className="text-sm text-blue-600 font-semibold">
                    {`#${cat}`}
                  </span>
                ))}
              </>
            ) : (
              <span className="text-sm text-gray-400 font-semibold">Sin Categoría</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
