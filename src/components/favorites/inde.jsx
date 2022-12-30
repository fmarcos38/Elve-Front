import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalStorage from '../../localStorage/service';
import { getAllFavs, deleteFav} from '../../redux/Actions';
import './favorites.css';
//--diseño---

import swal from 'sweetalert';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Navbar from '../Navbar';


function Favorites() {

    const store = LocalStorage.getUserActual();
    //console.log("userStore:", store.user._id);
    const favUser = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    useEffect(()=>{
       dispatch(getAllFavs(store.user._id));
    },[dispatch, store]);

    const handleDeleteFavs = (_idP) => {
        //para borrar de la DB
        dispatch(deleteFav({idP:_idP, idU: store.user._id}));
        //para borrar del localstorage
        let favLocalstorage = JSON.parse(localStorage.getItem('favorites'));
        favLocalstorage = favLocalstorage.filter(prod => prod._id !== _idP);
        //guardo el nuevo array en el localStorage
        localStorage.setItem('favorites', JSON.stringify(favLocalstorage));
        swal({
            title: "Prod Eliminado",
            text: `Eliminado de Favoritos`,
            icon: "success",
            button: "Aceptar",
        });
        dispatch(getAllFavs(store.user._id));
        //window.location.reload();//refresco la pagina PERO no es lo más correcto visualmnt 
    };

  return (
    <>
      <Navbar/>
      <div className='contGralFav'>        
        <h2 className='title'>Tus favoritos</h2>       
        {
        store.user ?            
        <table className='tableF'>
            <thead className='encabF'>
                <tr>
                    <th>Producto</th>
                    <th>Precio Unico/T.grande</th>
                    <th>Precio T.chico</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th ></th>
                </tr>
            </thead>
            {
                favUser?.map(prod => 
                    <tbody key={prod._id} className='tableBodyF'>
                        <tr>
                            <td><img className='cardImg' src={prod.imagen} alt='image not found'/></td>
                            <td>${prod.precioP}.00</td>
                            {
                                prod.priceCH > 0 ?
                                <td>${prod.priceCH}.00</td>
                                :
                                <td displa>No viene</td>
                            }
                            <td>{prod.name}</td>
                            <td>{prod.description}</td>
                            <td>
                                <Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}} 
                                    onClick={()=>handleDeleteFavs(prod._id)}>
                                    <DeleteIcon fontSize='large'/>
                                </Button>
                            </td> 
                        </tr>                       
                    </tbody>
                        
                )
            }
         
        
        </table>
        :
        <h2 className='SecondOption'>                    
            NO TIENES FAVORITOS      
        </h2>          
        }
      </div>
    </>
    
  )
}

export default Favorites