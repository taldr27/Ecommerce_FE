import { Link } from "react-router-dom";

export default function ProductCard({
  product: { name, price, stock, image, id, category },
}) {
  return (
    <Link to={`/detail/${id}`} className="block h-full max-w-[215px]">
      <div className="border border-gray-400 bg-pink-100 mb-4 relative rounded-md overflow-hidden flex flex-col h-full">
        <div className="w-full h-64 flex-shrink-0 flex items-center justify-center bg-gray-200">
          <img src={image} className="w-full h-full object-cover" alt={name} />
          <div className="absolute top-0 right-0 bg-yellow-200 text-black p-2">
            {stock} Units.
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h4 className="text-md text-black font-semibold mb-2">{name}</h4>
          <p className="text-sm text-black">S/ {price}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {category && category.length > 0 ? (
              category.map((cat, i) => (
                <span key={i} className="text-sm text-blue-600 font-semibold">
                  {`#${cat}`}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 font-semibold">
                No Category
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
