import React from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import gif from '../../imagenes/gifCafe2.gif';
import img1 from '../../imagenes/chapitas.jpg';
//import Navbar from '../Navbar';
import Footbar from '../Footbar/Footbar';

export default function LandingPage() {

  return (
    <>
      {/* <Navbar/> */}
      <div className={styles.contGral}>
        <div className={styles.contTitulo}>
          <h1 className={styles.titulo}>
            Bienvenidos a ELVEN COFFEE TO GO...
          </h1>
          <h3 className={styles.titulo2}>Café de especialidad y Pastelería de autor</h3>
        </div>

      {/* para pantalla smartphone */}
      <div className={styles.divFotoSmartphone}>
        <img src={img1} alt='not found' className={styles.img1}/>
      </div>
      {/* fin P - smartphone */}

      {/* imagns pantalla PC/note/Tv */}
      <div className={styles.divFoto}>
        <div className={styles.contgif}>
          <img src={gif} alt='not found' className={styles.gif}/>
        </div>
        <div className={styles.contfoto}>
          <img src={img1} alt='not found' className={styles.img1}/>
        </div>           
        <div className={styles.contgif}>
          <img src={gif} alt='not found' className={styles.gif}/>
        </div>           
      </div>
      {/* fin pantallas grandes */}

      <div className={styles.contTitulo}>
        <h4 className={styles.titulo3}>
          El café ayuda a quien duerme poco y sueña mucho
        </h4>
      </div>

      {/* btn pantalla smartphone */}
      <div className={styles.contbtn}>
        <Link to={'/home'}>
          <button className={styles.btnGO}>Go to the coffee...</button>
        </Link>
      </div>
      {/* fin btn */} 
        
      </div>
      <Footbar/>
    </>
  )
}

