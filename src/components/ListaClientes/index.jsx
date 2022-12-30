import React, {useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/Actions';

import swal from "sweetalert";
import style from './listaClientes.module.css';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../Navbar';


function ListaClientes() {

    const allUsers = useSelector(state => state.users);
    const soloClientes = allUsers.filter(u => u.role === 'cliente');
    const dispatch = useDispatch();    

    useEffect(()=>{
      dispatch(getUsers());
    },[allUsers]);//al poner la variable en la dependencia, cuando elim se actualiza

    const handleElimU = (_id) => {
      dispatch(deleteUser(_id));
      dispatch(getUsers());
    };

  return (
    <div >
        <Navbar/>
        
        <div className={style.container}>
            <table className={style.table}>
                <thead className={style.tableHead}>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Cuenta verif.</th>
                        <th>Bloqueado</th>
                        <th>Bloquear</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>

                {
                    soloClientes.map((c,i) => 
                    <tbody key={c._id} className={style.tableBody}>
                        <tr>
                            <td style={{width:'50px'}}>{i+1}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.tel}</td>
                            {c.verified === true ? <td>SI</td> : <td>NO</td>}
                            {c.bloqueado === true ? <td>SI</td> : <td>NO</td>}
                            <td>
                            <button className={style.btnLista} ><BlockIcon/></button>
                            </td>
                            <td>
                            <button className={style.btnLista} onClick={()=>handleElimU(c._id)}><DeleteIcon/></button>
                            </td>
                        </tr>
                    </tbody>
                    )
                }
            </table>
        </div>
    </div>
  )
}

export default ListaClientes;