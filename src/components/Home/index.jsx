import React, {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { filtraMenu, getUserById } from '../../redux/Actions';
import Navbar from '../Navbar';
import style from './styles.module.css'


export default function Home() {

  
  const dispatch = useDispatch();
  const allC = useSelector(state => state.categories);
  const bebidaC = allC.find(c => c.name === "Bebidas Calientes");
  const bebidaF = allC.find(c => c.name === "Bebidas Frías");
  const pasteleria = allC.find(c => c.name === "Pastelería");
  const salado = allC.find(c => c.name === "Salado");
  const deco = allC.find(c => c.name === "Decoración");  


  
  return (
    <>
      <Navbar/>
      <div className={style.container}>
      <div className={style.contListaP2}>
     
      {/* bebidas calientes */}
      <Link to={'/listaProds'} onClick={()=>dispatch(filtraMenu(bebidaC.name))}>
        <div className={style.card}>
          <div className={style.cardImageCaliente}></div>
          <div className={style.cardDescription}>
            <p className={style.textTitle}>Bebidas Calientes</p>
          </div>
        </div>
      </Link>
      
      {/* bebidas frias */}
      <Link to={'/listaProds'} id={'bebfrias'}  onClick={()=>dispatch(filtraMenu(bebidaF.name))}>      
        <div className={style.card}>
          <div className={style.cardImageFria}></div>
          <div className={style.cardDescription}>
            <p className={style.textTitle}>Bebidas Frías</p>
          </div>
        </div>
      </Link>

      {/* bebidas pastelería */}
      <Link to={'/listaProds'} id={'pasteleria'}  onClick={()=>dispatch(filtraMenu(pasteleria.name))}>
        <div className={style.card}>
          <div className={style.cardImagePasteleria}></div>
          <div className={style.cardDescription}>
            <p className={style.textTitle}>Pastelería</p>
          </div>
        </div>
      </Link>

      {/* salado */}
      <Link to={'/listaProds'} id={'salado'}  onClick={()=>dispatch(filtraMenu(salado.name))}>
        <div className={style.card}>
          <div className={style.cardImageSalado}></div>
          <div className={style.cardDescription}>
            <p className={style.textTitle}>Salado</p>
          </div>
        </div>
      </Link>

      {/*  deco */}
      <Link to={'/listaProds'} id={'deco'}  onClick={()=>dispatch(filtraMenu(deco.name))}>
        <div className={style.card}>
          <div className={style.cardImageDeco}></div>
          <div className={style.cardDescription}>
            <p className={style.textTitle}>Deco</p>
          </div>
        </div>
      </Link>

      {/* menu comp */}
      <Link to={'/listaProds'} id={'completo'}  onClick={()=>dispatch(filtraMenu("completo"))}>
        <div className={style.card}>
          <div className={style.cardImageMenuCompleto}></div>
          <div className={style.cardDescription}>
            <p className={style.textTitle}>Menú completo</p>
          </div>
        </div>
      </Link>
      </div>
      </div>
    </>
    
  )
}