import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CartContextProvider } from './context/cartContext';
import Navbar from './components/Navbar';
import Home from "./views/home"
import AllProducts from './views/AllProducts';
import ProductDetail from './views/productDetail';
import CheckOut from './views/checkOut';
import Register from './views/Register';
import Login from './views/Login';
import { AuthContextProvider } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';


export default function App(){
  return(
    <Router>
      <AuthContextProvider>
      <CartContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/detail/:id' element={<ProductDetail/>}/>
        <Route path='/checkOut' element={
        <ProtectedRoute><CheckOut/></ProtectedRoute>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </CartContextProvider>
      </AuthContextProvider>
    </Router>
  )
}
