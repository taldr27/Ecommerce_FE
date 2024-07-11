import ProductsSlice from "../components/ProductsSlice";
import useData from "../hooks/useAxios";
import Container from "../components/Container";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";

export default function Home() {
  const { data, loading } = useData(
    `${import.meta.env.VITE_ENDPOINT_BASE}/products/all`
  );
  return (
    <Container>
      <div
        className="relative"
        style={{
          backgroundImage: `url('https://img.freepik.com/vector-premium/interior-moderno-boutique-centro-comercial-centro-comercial-ropa_198278-1189.jpg')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          zIndex: -1,
          position: "fixed",
          width: "100%",
          height: "100%",
        }}
      ></div>
      <Carousel />
      <Categories />
      <ProductsSlice data={data.slice(0, 5)} isLoading={loading} />
    </Container>
  );
}
