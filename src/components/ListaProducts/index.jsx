import React, {useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from '../../redux/Actions';
import './Products.css';
import Navbar from '../Navbar';
import CardProd from '../CardProd';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import imagWhatsApp from './whatsapp.png';
import LocalStorage from '../../localStorage/service';

function ListaProducts() {

    const userLog = LocalStorage.getUserActual();
    const dispatch = useDispatch();
    const allProd = useSelector(state => state.productsFiltrados);
    const load = useSelector(state => state.load);

    //--url whatsapp-------------------------------
    let url = `https://wa.me/2236767430`;
    /* si se le quiere agregar texto ---> ?text=Hola%20estoy%20interesad@%20en%20tus%20de%20la%20productos */
    
    useEffect(()=>{
        dispatch(getProductos());
    }, [dispatch, allProd]);

    return (
    <>
        <Navbar/>
        <div className="cont-gral-prods">
        {/* loading */}
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
                    {/* mapeo prods */}
                    {
                        allProd[0] ?
                        allProd.map(p => {
                        return(
                            <div key={p._id}>
                                <CardProd key={p._id} _id={p._id} name={p.name} priceG={p.priceG} priceCH={p.priceCH} 
                                    imagen={p.imagen} description={p.description} discount={p.discount} category={p.category}
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
        {/* btn whatsapp SOLO para clientes*/}
        {
            userLog?.user.role === 'cliente' &&
            <a href={url}><img src={imagWhatsApp} className={"whatsapp"} alt='not found'/></a>
        }
        

    </div>
    </>
    
    )
}

export default ListaProducts