import React, { useState, useEffect } from "react";
import styles from "../UserProfile/UserAddressForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createAddress, updateUserAddress, getUserAddress } from "../../redux/Actions";
import LocalStorage from '../../localStorage/service';
import swal from "sweetalert";

export default function UserAddressForm(){
  
  const dispatch = useDispatch();
  const store = LocalStorage.getUserActual(); //console.log("store:", store);
  const [dataState, setDataState] = useState({ email: store.email, address: "",  notes: "", });
  const [validator, setValidator] = useState("");
  const userAddress = useSelector((state) => state.userAddress);  
  const adressId = userAddress._id;
  const navigate = useNavigate();  

  useEffect(()=>{
    //console.log("mail:",store.user.email)
    dispatch(getUserAddress({email:store.user.email}));
  },[dispatch]);

  useEffect(() => {//actualizo con la data desde la DB
    
      setDataState({
        email: userAddress[0]?.email,
        address: userAddress[0]?.address,
        notes: userAddress[0]?.notes,
      });
       
  }, [userAddress]);

  const handleChange = (e) => {
    e.preventDefault();
    setDataState({
      ...dataState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     if (!dataState.address) {
      setValidator("La direccion de envio es requerida")
    } else {
      if (dataState) {
        if (userAddress.length === 0) {        
          dispatch(createAddress(dataState))
          return swal({
            title: "Direccion creada corectamente",
            icon: "success",
            button: "Aceptar",})
            .then(()=>{
            window.location.reload()
            })
          } else {         
          dispatch(updateUserAddress(adressId, dataState));
          return swal({
            title: "Direccion actualizada corectamente",
            icon: "success",
            button: "Aceptar",})
            .then(()=>{
              navigate("/useraddress");
            })

        }
      }
      setValidator("");
      setDataState({
        address: "",
        notes: "",
        email: ""
      });
      document.getElementById("form").reset();
    }
  }; 


  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {
          userAddress[0]?.address ? 
          (
            <h1 className={styles.h1}>Actualiza tus datos envio </h1>
          ) : 
          (
            <h1 className={styles.h1}>
              Completa tus datos de envio
            </h1>
          )
        }

        <form id="form" onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          {/* email */}          
          <label>EMAIL: {store.user.email}</label>                     
          <br></br> 

          {/* direcc */}    
          <br></br>   
          <input className={styles.input} placeholder="Direccion" type="text" name="address" key="address"
            value={dataState.address} onChange={handleChange}
          />
          
          <textarea className={styles.textarea} name="notes" placeholder="Aclaraciones..." id="message_input"
              cols="30" rows="5" key="notes" value={dataState.notes} onChange={handleChange} >
          </textarea>
          
          {validator && (
            <div>
              <h3>{validator}</h3>
            </div>
          )}
          <div className="submit">
            <button
              className={styles.formButton}
              type="submit"
              key="submit"
              value="submit"
              id="form_button"
              onChange={handleChange}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};