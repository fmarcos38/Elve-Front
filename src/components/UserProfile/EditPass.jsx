import { Button } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { getUserById, actualizaPass } from '../../redux/Actions'
import style from './EditProfile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';


export default function EditPass() {

  //cargo datos del user logueado
  const store = JSON.parse(localStorage.getItem('user'));
  console.log("userLog:", store);
  
  const dispatch = useDispatch()
  const [password ,setPass] = useState(false);
  const [input, setInput] = useState();   

  useEffect(()=>{
      dispatch(getUserById(store.user._id))
  },[dispatch]);

  function handleSubmit(e){
    if(!input){
      e.preventDefault()
      swal({
        title: "Error",
        text: 'Falta completar correctamente el formulario',
        icon: "error",
        button: "Aceptar",
      });
    }
    else{
      e.preventDefault()
      console.log("id:", store.user._id);
      console.log("pass:", input);
      dispatch(actualizaPass(store.user._id, {password:input}))
      swal({
        title: "Perfil Actualizado",
        text: `Se modifico correctamente tu perfil`,
        icon: "success",
        button: "Aceptar",
      });
      setInput({ password:''})
    }
  };    
  function handleOnChange(e) {
        e.preventDefault()
        
        setInput(e.target.value );
  }
  
  //edit name
  function handleEdit(e){
        e.preventDefault()
        setPass(true)
        if(password === false){
          setPass(true)
        }
        if(password === true){
          setPass(false)
        }
  };

  return (
    <div className={style.containerAllPerfil}>
        
            <form onSubmit={handleSubmit} className={style.contForm}>

              {/* edita nombre */}
              <div className={style.ContainerPerfil}>
              <label className={style.labelname}>Editar Password</label>
                {/* edita nombre */}
                <div className={style.namediv}>                      
                {
                  password === false ?
                  <label className={style.labelname}>***********
                    <Button onClick={e=>handleEdit(e)} 
                      style={{paddingLeft:'20px',maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px", }}
                    >
                      <EditIcon  style={{color:'#60b582'}}/>
                    </Button>
                  </label>
                : 
                  <div className={style.nameinputdiv}>
                    
                    <input type='password' placeholder={"********"} name='password' className={style.name}
                        value={input} onChange={handleOnChange}
                    />
                    <Button onClick={e=>handleEdit(e)} 
                      style={{marginLeft:'4px',maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px",}}
                    >
                      <CancelIcon  style={{color:'#60b582'}}/>
                    </Button>
                  </div>
                }
                </div>
                
                {/* btn actualizar */}
                <div className={style.btn}>
                  <Button variant="contained" type="submit" onSubmit={handleSubmit}   
                    style={{backgroundColor:'#60b582',marginBottom:'.7em'}}> Actualizar </Button>
                </div>
                
              </div>

            </form>
    </div>
  )
}
