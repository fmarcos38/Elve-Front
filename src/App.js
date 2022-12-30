import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Oferta from './components/Ofertas';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* productos   */}
        <Route path='/listaProdsOferta' element={<Oferta/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
