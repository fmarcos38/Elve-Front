import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCompraDetalle } from '../../redux/Actions';
import style from './DeleteProduct.module.css';

function DetalleCompra() {

    const detalleCompra = useSelector(state => state.compraDetalle);
    const dispatch = useDispatch();
    const {_id} = useParams();

    useEffect(()=>{
       dispatch(getCompraDetalle(_id));
    },[dispatch]);


  return (
    <div>
        <div className={style.container}>
            <table className={style.table}>
                <thead className={style.tableHead}>
                    <tr>
                        <th></th>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>{/* boton */}
                        <th>SubTotal</th>
                    </tr>
                </thead>
                {
                    detalleCompra.cart?.map((p,i) =>
                        <tbody key={p._id} className={style.tableBody}>
                            <tr>
                                <td>{i+1}</td>
                                <td><img src={p.picture_url} style={{width:'45px'}}/></td>
                                <td>{p.title}</td>
                                <td>{p.quantity}</td>
                                <td>{p.unit_price}</td>
                                <td>{p.quantity * p.unit_price}</td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    </div>
  )
}

export default DetalleCompra