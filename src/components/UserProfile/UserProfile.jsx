import React, { useEffect, useState } from "react";
import styles from "../UserProfile/UserProfile.module.css";
import { NavLink } from "react-router-dom";
import EditName from "./EditName";
import EditPass from "./EditPass";
import LocalStorage from '../../localStorage/service';
import Navbar from "../Navbar";


export default function UserProfile() {
  const user= LocalStorage.getUserActual();
  

  return(
    <>
      <Navbar/>
      <div className={styles.container}>
        {/* titulo */}
        <div className={styles.profileTitle}>
          <h1>Mi Perfil</h1>
        </div>

        {/* componente edita name y pass */}
        <div className={styles.editNyP}>           
          <EditName/>
          <EditPass/>
        </div>        
        
        {/* comp. mis pedidos */}
        {
          user.user.role === 'cliente' &&      
            <div className={styles.cardContainer}>
              {/* APROBADOS */}
              <div className={styles.card}>
                <NavLink to="/userorders/approved" style={{textDecoration:'none',color:'#5A5A5A'}}>
                  <h3 className={styles.card__title}>Mis Pedidos</h3>
                </NavLink>
                <p className={styles.card__content}>
                  Realiza el seguimiento de tus pedidos. {" "}
                </p>
              </div>
          
              {/* comp. Address */}
              <div className={styles.card}>
                <NavLink to="/useraddress" style={{textDecoration:'none',color:'#5A5A5A'}}>
                  <h3 className={styles.card__title}>Direcciones</h3>
                </NavLink>
                <p className={styles.card__content}>
                  Editar direccion de envio o preferencias para tus pedidos{" "}
                </p>
              </div>

            </div>
        }
        
      
      </div>
    </>
  )
};