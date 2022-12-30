import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import style from './Confirm.module.css';
import { eliminaCompraSinAbonar } from '../../redux/Actions';


export default function Confirm() {
    const cart = useSelector((state) => state.cart);
    const linkmp = useSelector((state) => state.linkmp);
    const dispatch = useDispatch();
    let subtotal = 0;
    let total = 0; 
    
    for (let i = 0; i < cart.length; i++) {
      subtotal += cart[i].quantity * (Math.round(cart[i].price * (100 - cart[i].discount ) / 100));
    }
    total = subtotal;

    //hacer un useEffect para en el momento de murte del componente BORRE la compra de la tabla
    //asi no se llena de compras en estado pending
    useEffect(()=>{
        return () => dispatch(eliminaCompraSinAbonar());
    },[]);

    return (
        <div className={style.container}>
            <h3>Total: $ {total}.00</h3>
            
            <a href={linkmp} style={{textDecoration:'none', color:'black', margin:'0'}}>
               <Button variant="contained"  sx={{mt:'100px'}}> CONFIRMAR PAGO </Button>
            </a>
            
        </div>
    )
}
