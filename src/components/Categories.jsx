import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="text-gray-800 bg-white body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-2xl title-font font-medium mb-4">Categories</h2>
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link to={{ pathname: "/products", search: "?search=men" }}>
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Men"
                  className="object-cover object-center w-full h-full block"
                  src="https://images.unsplash.com/photo-1594759845217-e9c99af2b6a4?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
            </Link>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-dark title-font text-lg font-medium">Men</h2>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link to={{ pathname: "/products", search: "?search=women" }}>
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Women"
                  className="object-cover object-center w-full h-full block"
                  src="https://images.unsplash.com/photo-1584184804426-5e2aa23c2937?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
            </Link>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-dark title-font text-lg font-medium">
                Women
              </h2>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link to={{ pathname: "/products", search: "?search=accessories" }}>
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Accessories"
                  className="object-cover object-center w-full h-full block"
                  src="https://plus.unsplash.com/premium_photo-1679439492719-d834747e5c7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tYW4lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D"
                />
              </div>
            </Link>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-dark title-font text-lg font-medium">
                Accessories
              </h2>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link to={{ pathname: "/products", search: "?search=sports" }}>
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Deporte"
                  className="object-cover object-center w-full h-full block"
                  src="https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
            </Link>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-dark title-font text-lg font-medium">
                Sports
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
