import React from 'react';
import {Instagram} from '@mui/icons-material';
import { WhatsApp } from '@mui/icons-material';
import './footbar.css';
import { Link } from 'react-router-dom';

function Footbar() {

  //--url whatsapp-------------------------------
  let url = `https://wa.me/2236767430`;
  /* si se le quiere agregar texto ---> ?text=Hola%20estoy%20interesad@%20en%20tus%20de%20la%20productos */

  return (
    <div className='contFootbar'>

        <div className="leftFooter">
          <p className='textoIzq'>Horarios:</p> 
          <p className='textoIzq'>Lunes a Sabados: de 9 a 13 y de 16 a 20hs</p>
          <p className='textoIzq'>Domingos: de 16 a 20hs</p>
        </div>
        {/* horarios pantalla chica */}
        <div className="leftFooterPCH">
          <p className='textoIzqPCH'>Horarios:</p> 
          <p className='textoIzqPCH'>Lun a Sab: 9a13 - 16a20hs</p>
          <p className='textoIzqPCH'>Dom: 16 a 21hs</p>
        </div>

        <div className="midFooter">
          <h4 className='textoMedio'>Elven-Coffee - Tienda online</h4>    
          <p className='textoMedioYO'>Diseño y Programación Web Marcos Forastiere</p>
        </div>

        <div className="rightFooter">
          <h3 className='followUs'>Follow Us</h3>
          <div className='subDivDerecha'>
            <a href="https://www.instagram.com/elvencoffee/"  className='linkRedes'><Instagram/></a>
            <a href={url} className='linkRedes'><WhatsApp/></a>
          </div>           
        </div>
        
    </div>
  )
}

export default Footbar



