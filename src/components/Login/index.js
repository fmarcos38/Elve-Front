import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Button from "../../styledComponents/Button";
import DivContainer from "../../styledComponents/DivConteiner";
import InputComp from '../FormElements/Input';
import {regExp} from '../FormElements/regExp';
import Swal from "sweetalert2";
import {getUserById, getUsers, login} from "../../redux/Actions";
import styles from './styles.module.css';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import LoginGoogle from './LoginGoogle/loginGoogle';


function Login() {
  
  const [email, setEmail] = useState({key: "", valid: null});
  const [password, setPassword] = useState({key: "", valid: null});
  const dispatch = useDispatch();  
  const navigate = useNavigate(); 

  /* me traigo los users para ver si validó su cuenta */
  const users = useSelector(state => state.users);
  let buscoUser = users.find(u => u.email === email.key);//MUY ATENTO A PONER .KEY

  useEffect(()=>{
    dispatch(getUsers());
  },[dispatch]);

  const handleSub = (e) => {
    e.preventDefault();

    if(!buscoUser){
      Swal.fire('Usuario inexistente.');
      setEmail({key: "", valid: null});
      setPassword({key: "", valid: null});
    }else{
      if(buscoUser.verified === false){
        Swal.fire('Cuenta sin validar, revisa tu email!!')
      }else{
        if (email.valid === 'true' && password.valid === 'true') {
          dispatch(login({ email: email.key, password: password.key }));
          dispatch(getUserById(buscoUser._id));
          //traer carrito user log
          Swal.fire('Log exitoso.');
          navigate('/home');
          setEmail({key: "", valid: null});
          setPassword({key: "", valid: null});
        }
        else Swal.fire('Revise sus datos.')
      }
    }
    
  }; 
  
  return (
    <div className={styles.createProperty}>

      <form onSubmit={handleSub} className={styles.formLog}>
        <p className='titulo'>Inicie Sesión</p>

        <DivContainer className={styles.login}>
          <InputComp 
            name='Correo electrónico:'
            type='text'
            placeHolder='Usuario'
            errorLeyend={regExp.email.errorLeyend}
            regExp={regExp.email.regExp}
            state={email}
            setState={setEmail}
            width='100%'
          />

          <InputComp                
            name='Contraseña:'
            type='password'
            placeHolder='Contraseña'
            errorLeyend={regExp.password.errorLeyend}
            regExp={regExp.password.regExp}
            state={password}
            setState={setPassword} 
            width='100%'  
          />

          <div className="group">
            <Button className={styles.buttonIngresar} type="submit">Ingresar</Button> 
          </div>

        </DivContainer>
      </form>

      <div className={styles.or}>──────────OR──────────</div>

      {/* login with google */}
      <LoginGoogle/>

      <p className={styles.pMensaje}>¿No tienes una cuenta?</p>
      
      <Link to={"/registrarse"} style={{ textDecoration: "none" }}>
        <Button className={styles.buttom} style={{ m: "0" }}>
          Registrate
        </Button>
      </Link>

    </div>
  )
}

export default Login