import { useEffect, useState } from "react";

const Ventas = () => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_ENDPOINT_BASE}/sales/all`
      );
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const calculateTotalAndIGV = (sale) => {
    const subtotal = sale.sale_details.reduce(
      (acc, detail) => acc + detail.price * detail.quantity,
      0
    );
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    return {
      subtotal,
      igv,
      total,
    };
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center">Sales</h1>
      {sales.length > 0 ? (
        sales.map((sale) => {
          const { subtotal, igv, total } = calculateTotalAndIGV(sale);

          return (
            <div
              key={sale.id}
              className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Sale #{sale.id}</h2>
                  <p className="text-gray-600">
                    {new Date(sale.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    Total: S/ {total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Gravada: S/ {subtotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    IGV: S/ {igv.toFixed(2)}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Details:</h3>
                <ul className="space-y-4">
                  {sale.sale_details.map((detail) => (
                    <li
                      key={detail.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        <img
                          src={detail.product.image}
                          alt={detail.product.name}
                          className="w-16 h-16 rounded-md object-cover mr-4"
                        />
                        <div>
                          <p className="font-medium">
                            Product: {detail.product.name}
                          </p>
                          <p>Description: {detail.product.description}</p>
                          <p>Price: S/ {detail.price.toFixed(2)}</p>
                          <p>Quantity: {detail.quantity}</p>
                          <p>Category: {detail.product.category.join(", ")}</p>
                          <p>User ID: {sale.user_id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p>
                          Subtotal:{" "}
                          <span className="font-medium text-green-600">
                            S/ {(detail.price * detail.quantity).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">There are no sales.</p>
      )}
    </div>
  );
};

export default Ventas;
