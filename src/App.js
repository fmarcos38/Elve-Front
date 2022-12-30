import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Login from './components/Login';
import Registrarse from './components/Registrarse';
import RespValidaCuenta from './components/RespValidaCuenta';
import ListaProducts from './components/ListaProducts';
import Oferta from './components/Ofertas';


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
        {/* productos   */}
        <Route path='/listaProds' element={<ListaProducts/>}/>
        <Route path='/listaProdsOferta' element={<Oferta/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
