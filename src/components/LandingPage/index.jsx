import React from 'react'
import gif1 from '../../imagenes/joda.gif';
import gif2 from '../../imagenes/joda2.gif';
import './landing.css'


function LandingPage() {

  return (
    <div className='contenedorGral'>
        <h1 className='titulo'>Chupenme bien la japi ..Putitas!!!</h1>
        <img src={gif1}/>
        <h1 className='titulo'>Esta se la dedico al Vikingo Sexy!!!</h1>
        <img src={gif2}/>
        <h1 className='titulo'>Feliz año...Putitas!!!</h1>

    </div>
  )
}

export default LandingPage