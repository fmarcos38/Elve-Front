import { Button } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { getUserById, actualizaName } from '../../redux/Actions'
import style from './EditProfile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalStorage from '../../localStorage/service';

export default function EditName() {
  //tendría q traerme la data del user desd la DB, mostrar el name en el input,
  //al actualizar el name, actualoz tamb en la DB y localStorage

  //cargo datos del user logueado
  const store = LocalStorage.getUserActual();
  //console.log("userLog:", store);

  const userDB  = useSelector((state)=> state.user);  
  const [nombre ,setNombre] = useState(false);
  const [error, setError] = useState({})
  const [input, setInput] = useState({name: userDB.name}); 
  const dispatch = useDispatch();  

  useEffect(()=>{
      dispatch(getUserById(store.user._id));
  },[dispatch]);

  function handleSubmit(e){
    if(!input.name){
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
      //console.log("data:", input);
      dispatch(actualizaName(store.user._id, input));
      swal({
        title: "Perfil Actualizado",
        text: `Se modifico correctamente tu perfil`,
        icon: "success",
        button: "Aceptar",
      });
      setInput({ name:''});
      //se tendría q reEscribir el name en el localStorage(pero no funcionó)
      localStorage.setItem('user.name', userDB.name);
      dispatch(getUserById(store.user._id));
      //window.location.reload();
    }
  };    
  function handleOnChange(e) {
        e.preventDefault()
        
        setInput((state) => {
          const newState = {
            ...state,
            [e.target.name]: e.target.value,
          };
          setError(validate(newState))
          return newState;
        });
  }
  function validate(input){
    let error = {};
    if(!/^[a-zA-Z\s]*$/.test(input.name)){
      error.name = "Pleace, enter only letters";
      setInput({
        name: store?.user.name,      
      })
    }
    return error
  }
  //edit name
  function handleEdit(e){
        e.preventDefault()
        setNombre(true)
        if(nombre === false){
          setNombre(true)
        }
        if(nombre === true){
          setNombre(false)
        }
  };

  return (
    <div className={style.containerAllPerfil}>
        
            <form onSubmit={handleSubmit} className={style.contForm}>

              {/* edita nombre */}
              <div className={style.ContainerPerfil}>
              <label className={style.labelname}>Editar Nombre</label>
                {/* edita nombre */}
                <div className={style.namediv}>                      
                {
                  nombre === false ?
                  <label className={style.labelname}>{userDB.name}
                    <Button onClick={e=>handleEdit(e)} 
                      style={{paddingLeft:'20px',maxWidth: "30px", maxHeight: "30px",minWidth: "20px",minHeight: "20px", }}
                    >
                      <EditIcon  style={{color:'#60b582'}}/>
                    </Button>
                  </label>
                : 
                  <div className={style.nameinputdiv}>
                    {error.name && (<div><span style={{color:'#60b582'}}>{error.name}</span></div>)}
                    <input type='text' placeholder={userDB.name} name='name' className={style.name}
                        value={input.name} onChange={handleOnChange}
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
