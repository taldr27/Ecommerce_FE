import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import ProductsSlice from "../components/ProductsSlice"
import useData from "../hooks/useAxios";
import Container from "../components/Container";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

export default function Home() {

    const shared = useContext(CartContext);
    console.log(shared)

    const {data, error, isLoading} = useData (`${import.meta.env.VITE_ENDPOINT_BASE}/productos`);
    if(isLoading) return <p>Cargando...</p>
    if(error) return <p>Error: {error.message}</p>
    return (
        <>
            
            <Container>
                <div className="relative" style={{
                    backgroundImage: `url('https://img.freepik.com/vector-premium/interior-moderno-boutique-centro-comercial-centro-comercial-ropa_198278-1189.jpg')`,
                    backgroundSize: "cover",
                    opacity: 0.5,
                    zIndex: -1,
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                }}>
                </div>
            <Carousel />
            <Categories />
            <ProductsSlice data={data.slice(0,5)}/>
            </Container>
            <Footer />
        </>
          )
    }

    
