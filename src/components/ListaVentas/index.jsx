import React, {useEffect, useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCompras, getVentasByName, getUsers, getVentasProDia, resetCompras, getVentasPorMes } from '../../redux/Actions';
import style from './listaVentas.module.css';
import swal from 'sweetalert';
import Navbar from '../Navbar';


function ListaVentas() {

  const allV = useSelector(state => state.comprasUser);
  //filtrar solo status aproved
  const comprasAproved = allV.filter(c => c.status === 'approved'); 
  const dispatch = useDispatch();
  //estado para buscar por nombre
  const [input, setInput] = useState({nombre: ""});
  //estado para buscar por día
  const [fecha, setFecha] = useState("");
  //estado para buscar por mes
  const [mes, setMes] = useState("");
  //------------------------------------------
  //--variables prueba para ver el dia
  // let diaPrueba = new Date();
  // let now = diaPrueba.toLocaleString();
  // console.log("ahora:", now);
  //------------------------------------------
  useEffect(()=>{
    dispatch(getCompras());
    dispatch(getUsers());
  },[dispatch]);

  //filtrar por nombre
  const handleChangeNombre = (e) => {
    setInput({nombre: e.target.value});
  };
  const handleClickPorNombre = (e) => {
    e.preventDefault();
    if(!input.nombre){
      swal({
        text: `Ingrese el nombre del cliente`,
        icon: "success",
        button: "Aceptar",
      });
    }else{
      dispatch(getVentasByName(input.nombre));
      setInput({nombre: ""});
    }
  };
  //--fin filtrar por nombre
  
  //filtra por día--------------
  const handleChangePorDía = (e) => { 
    //formato del input --> "2022-12-19"
    setFecha(e.target.value); 
  };
  const handleSubPorDía = (e) => {
    e.preventDefault();
    if(!fecha){
      swal({
        text: `Ingresá una fecha, pedazo de boludo!!`,
        icon: "success",
        button: "Aceptar",
      });
    }else{
      dispatch(getVentasProDia(fecha));
      setFecha("");
    }
  };
  //--fin dia-------------------

  //--filtra x mes--------------
  const handleChangeMes = (e) => {
    setMes(e.target.value);//formato--> 2022-12
  };
  const handleSubPorMes = (e) => {
    e.preventDefault();
    if(!mes){
      swal({
        text: `Ingresá una mes, pedazo de boludo!!`,
        icon: "success",
        button: "Aceptar",
      });
    }else{
      dispatch(getVentasPorMes(mes));
      setMes("");
    }

  };
  //reset filtros
  const handleReset = (e) => {
    dispatch(resetCompras());
  };

  return (
    <div>   
      <Navbar/>   
      <div className={style.container}>
        {/*---FILTROS--------- */}
        <div className={style.contFiltros}>
          {/* Por Nombre Cliente */}
          <form onSubmit={handleClickPorNombre}>
            <input id={'nombre'} value={input.nombre} onChange={handleChangeNombre} placeholder={'nombre cliente'} className={style.inputVnts}/>
            <button type='submit' className={style.btnFiltro}>Por Nombre</button>
          </form>

          {/* por día */}
          <form onSubmit={handleSubPorDía}>
            <input id={'dia'} type={'date'} value={fecha} onChange={handleChangePorDía} className={style.inputVnts}/>
            <button type='submit'className={style.btnFiltro} >Por Día</button>
          </form>

          {/* por mes */}
          <form onSubmit={handleSubPorMes}>
            <input type={'month'} id={'mes'} value={mes} onChange={handleChangeMes} className={style.inputVnts}/>
            <button type='submit'className={style.btnFiltro} >Por Mes</button>
          </form>

          {/* reset */}
          <button className={style.btnResetVnts} onClick={handleReset}>Reset Ventas</button>
        </div>

        {/* tabla ventas*/}        
        <table className={style.table}>
          <thead className={style.tableHead}>
              <tr>
                  <th></th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Detalle</th>{/* boton */}
              </tr>
          </thead>
          {/* mapeo elemntos de la tabla */}
          {            
            comprasAproved.map((v,i) =>   
              <tbody key={v._id} className={style.tableBody}>
                <tr>
                  <td>{i+1}</td>
                  <td>{v.user_name}</td>
                  <td>{v.fecha_compra}</td>
                  <td>${v.cart.map(e => e.unit_price * e.quantity).reduce((acc, e) => acc + e ,0)}</td>
                  <td>
                    <Link to={`/compraDetalle/${v._id}`}>
                      <button className={style.btnDet} >Detalle</button>
                    </Link> 
                  </td>
                </tr>                
              </tbody>                  
                      
            )
          }
          {/* footer/pie de tabla */}
          <tfoot className={style.tableHead}>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>
                {
                  comprasAproved.map(c => c.cart.map(
                    e => e.unit_price * e.quantity).reduce((acc, e) => acc + e ,0)
                  ).reduce((acc,e) => acc + e, 0)
                }
              </th>
              <th></th>{/* boton */}
            </tr>
          </tfoot>
        </table>
     
      </div>
    </div>
  )
}

export default ListaVentas