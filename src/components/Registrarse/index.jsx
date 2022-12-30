import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from "../../styledComponents/Button";
import DivContainer from "../../styledComponents/DivConteiner";
import InputComp from '../FormElements/Input';
import {regExp} from '../FormElements/regExp';
import Swal from "sweetalert2";
import {getUsers, registrarse} from '../../redux/Actions';


function Registrarse() {

    const [name, setName] = useState({key: "", valid: null});    
    const [email, setEmail] = useState({key: "", valid: null});
    const [password, setPassword] = useState({key: "", valid: null});
    const [repitePass, setRepitePass] = useState({key: "", valid: null});
    const [tel, setTel] = useState({key: "", valid: null}); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //corroboro si ya existe ese user/mail
    const users = useSelector(state => state.users);
    const buscaUser = users.find(u => u.name === name);

    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch]);

    //limpia inputs
    const cleanForm = () => {
        setName({ key: '', valid: null });
        setPassword({ key: '', valid: null });
        setRepitePass({ key: '', valid: null });
        setTel({ key: '', valid: null });
        setEmail({ key: '', valid: null });
    };

    const handleSub = (e) => {
        e.preventDefault();
        let data = {name: name.key, password: password.key, email: email.key, tel: tel.key};

        if(password.key !== repitePass.key){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Oops, las contraseñas no coinciden!!.'
            })
        }else{
            /* if(name.valid === 'true' && tel.valid === 'true' && password.valid === 'true' && repitePass.valid === 'true' && email.valid === 'true'){} */
                dispatch(registrarse(data));
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Usuari@ creado@ exitosamente, verificá tu email para activar la cuenta',
                    showConfirmButton: false,
                    timer: 2000
                });
                cleanForm();
                navigate('/login');            
        }        
        
    };

  return (
    <div className={styles.createProperty}>
        <form onSubmit={handleSub} className={styles.formRegistrarte}>
            <DivContainer className={styles.login}>
                {/* name */}
                <InputComp 
                  name='Nombre'
                  type='text'
                  errorLeyend={regExp.name.errorLeyend}
                  regExp={regExp.name.regExp}
                  state={name}
                  setState={setName}
                  width='100%'
                />
                {buscaUser && (<p className='errorSpan'>ya existe usuario c/ese email</p>)}
                {/* email */}
                <InputComp 
                  name='Correo electrónico:'
                  type='text'
                  errorLeyend={regExp.email.errorLeyend}
                  regExp={regExp.email.regExp}
                  state={email}
                  setState={setEmail}
                  width='100%'
                />
                {/* tel */}
                <InputComp                
                  name='Telefono:'
                  type='number'
                  errorLeyend={regExp.tel.errorLeyend}
                  regExp={regExp.tel.regExp}
                  state={tel}
                  setState={setTel} 
                  width='100%'                   
                />
                {/* pass */}
                <InputComp 
                        name='Contraseña:'
                        type='password'
                        errorLeyend={regExp.password.errorLeyend}
                        regExp={regExp.password.regExp}
                        state={password}
                    setState={setPassword}
                />
                {/* repite pass */}         
                <InputComp 
                    name='Repetir Contraseña:'
                    type='password'
                    errorLeyend={regExp.password.errorLeyend}
                    regExp={regExp.password.regExp}
                    state={repitePass}
                    setState={setRepitePass}
                />

                <div className="group">
                  <Button className={styles.buttonIngresar} type="submit" >Ingresar</Button> 
                </div>
            </DivContainer>
      </form>
    </div>
  )
}

export default Registrarse