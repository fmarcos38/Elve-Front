import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProductos } from '../../redux/Actions';
import Loading from '../Loading/Loading';
import CardProd from '../CardProd';
import NotFound from '../NotFound/NotFound';
import imagWhatsApp from '../ListaProducts/whatsapp.png';
import "./ofertas.css";
import Navbar from '../Navbar';

function Oferta() {

    const allProd = useSelector(state => state.products);
    const allProdOferta = allProd.filter(prod => prod.isPromo !== false);
    const load = useSelector(state => state.load);
    const dispatch = useDispatch();

    //--url whatsapp-------------------------------
    let url = `https://wa.me/2236767430`;
    /* si se le quiere agregar texto ---> ?text=Hola%20estoy%20interesad@%20en%20tus%20de%20la%20productos */

    useEffect(()=>{
        dispatch(getProductos());
        dispatch(getCategories());
    },[]);

  return (
    <>
      <Navbar/>
      <div className="cont-gral-prods">
        {
            load === "true" ?
            (
               <div>
                  <Loading/>
               </div>
            )
            :
            (
                <div className="cont-filtrosYcards">
                {/* filtros */}

                {/* mapeo prods */}                
                {
                   allProdOferta[0] ?
                   allProdOferta.map(p => {
                       return(
                           <div key={p._id}>
                               <CardProd key={p._id} _id={p._id} name={p.name} priceG={p.priceG} priceCH={p.priceCH} 
                                   imagen={p.imagen} description={p.description} discount={p.discount}
                               />
                           </div>
                           )
                       }) 
                   : 
                   (
                       <div className="notfound">
                         <NotFound/>
                       </div>
                   )
                }                

                </div>
            )
        }
        {/* btn whatsapp */}
        <a href={url}><img src={imagWhatsApp} className={"whatsapp"} /></a>

    </div>
    </>
  )
}

export default Oferta