import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router'
import { validaCuenta } from '../../redux/Actions';
import { Link } from 'react-router-dom';
import Style from "./styles.module.css"


function RespValidaCuenta() {

    const search = useLocation().search;
    const token = new URLSearchParams(search).get("token");//obtngo el token desd la url
    console.log("tokenURL:", token)
    const dispatch = useDispatch();

    const handleValida = async(e) => {
      try {
        dispatch(validaCuenta(token));
      } catch (error) {
        console.log(error)
      }
    };

    useEffect(()=>{
      handleValida()
    },[handleValida]);

  return (
    <div className={Style.backg}>
      <div className={Style.textContainer}>
        <div className={Style.background}>
          <h1 className={Style.titulo}>Bienvenido!</h1>
          <h2 className={Style.spacing}>Tu cuenta ha sido verificada correctamente!</h2>
          <h3 className={Style.p}> Ahora puedes disfrutar todas las funcionalidades de nuestra pagina</h3>
          <Link to='/login'>
            <button className={Style.btn_irLogin}>
              Ingresar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RespValidaCuenta