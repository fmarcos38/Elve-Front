import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Login from './components/Login';
import Registrarse from './components/Registrarse';
import RespValidaCuenta from './components/RespValidaCuenta';
import FormCreateProd from './components/FormCreateProd';
import ListaProducts from './components/ListaProducts';
import Oferta from './components/Ofertas';
import Favorites from './components/favorites/inde';
import ModifProd from './components/ModifProd';
import MuestraListaProds from './components/MuestraListaProductos';
import FormCategories from './components/FormCategorias';
import Carrito from './components/carritoComp';
import Confirm from './components/Confirm/Confirm';
import Succes from './components/RespuestaCompra/Succes';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* creación user */}
        <Route path='/registrarse' element={<Registrarse/>}/>
        <Route path='/confirmed' element={<RespValidaCuenta/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* categorias  */}
        <Route path='/createCat' element={<FormCategories/>}/>
        {/* productos   */}
        <Route path='/formProd' element={<FormCreateProd/>}/>
        <Route path='/listaProds' element={<ListaProducts/>}/>
        <Route path='/listaProdsOferta' element={<Oferta/>}/>
        <Route path='/modifProd/:_id' element={<ModifProd/>}/>
        <Route path='/muestraListProds' element={<MuestraListaProds/>}/>
        {/* Favoritos */}
        <Route path='/userfavorites' element={<Favorites/>}/>
        {/* compras */}
        <Route path='/carrito' element={<Carrito/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
        <Route path='/success' element={<Succes/>}/> {/* respuesta confirma compra*/}
        
      </Routes>
      
      
    </div>
  );
}

export default App;
