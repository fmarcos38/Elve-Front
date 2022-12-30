import React from "react";
import styles from "../UserProfile/UserAddressCard.module.css";
import { NavLink } from "react-router-dom";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function UserAddressCard({ address, notes}) {
  
  return (
    <div className={styles.container}>
      <h1 style={{textAlign:'center',marginTop:'1em', marginBottom:'1em',color:'#5A5A5A',fontSize:'2em'}}>
        Mi dirección de entrega:
      </h1>
      <h4>Pasá sobre el recuadro para modif <SentimentSatisfiedAltIcon/></h4>
      <div className={styles.dirTitle}></div>
      <div className={styles.card}>
        <div className={styles.cardDetails}>
          <p className={styles.textBody}>Direccion: {address}</p>
          <p className={styles.textBody}>Notas: {notes}</p>
        </div>
        <NavLink to={`/userAddressForm/`}>
          <button className={styles.cardButton}>Editar direccion</button>
        </NavLink>
      </div>
    </div>
  );
};

