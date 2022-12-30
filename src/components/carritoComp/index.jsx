import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LocaStorage from '../../localStorage/service';
import {
  getCarritoUser, deleteProductCart, postMP, postCompra, getComprasUser
} from '../../redux/Actions';

import './carrito.css';
import Button from "@mui/material/Button";
import { Delete } from '@mui/icons-material';


function Carrito() {

  const carritoUser = useSelector(state => state.cart);
  const userLog = LocaStorage.getUserActual();
  const dispatch = useDispatch();
  let navigate = useNavigate();
       

  useEffect(()=>{
    dispatch(getCarritoUser(userLog.user._id));
    dispatch(getComprasUser(userLog.user._id));
  },[dispatch, userLog.user._id]);
    
  let total = 0;
   
  //--calculo precio y descuento para c/producto PARA mostrarlo en el total
  for (let i = 0; i < carritoUser.length; i++) {
    total += carritoUser[i].quantity * (Math.round(carritoUser[i].price * (100 - carritoUser[i].discount ) / 100));
  }

  const handleElim = (name) =>{
    dispatch(deleteProductCart({name: name, idU:userLog.user._id}));
    dispatch(getCarritoUser(userLog.user._id));
    //window.location.reload();
  };

  //---tiene q ver con la respuesta de MP -->hacia dond te re dirige, una vez realizado el pago
  //--colocar URL --> del deploy
  const [body, setBody] = useState({
        items: [],
        back_urls: {
          failure: "http://localhost:3002/success",
          pending: "http://localhost:3002/success",
          success: "http://localhost:3002/success",
        },
        auto_return: "approved",
  });

  const handleComprar = () => {
    //creo variable para la fecha
    let today = new Date();
    // obtener la fecha y la hora    
    const fechaArray = [today.getDate(), today.getMonth()+1, today.getFullYear()];//-->se cambió esta LINEA<--
    var now = fechaArray.join("/");
    //normalizo c/producto para mandar al back con la info correspondiente p/mercadopago
    setBody(
        carritoUser.map((e) =>
         body.items.push({
          title: e.name,
          unit_price: Math.round(e.price * (100 - e.discount) / 100),//no si va ese e.price o mi variable price
          quantity: e.quantity,
          picture_url: e.imagen,
          id: e._id,
        })
      )
    );
    
    dispatch(postMP(body));
    dispatch(postCompra({ 
      cart: body.items , 
      idU: userLog.user._id, 
      nameU: userLog.user.name,
      fechaC: now
    }));//se agregó nameU y fecha
    setBody({
          items: [],
          back_urls: {//colocalr urls diploy
            failure: "/failure",
            pending: "/pending",
            success: "/success", //"https://mikasa-nueva.vercel.app/purchase",
          },
    });
        
    //redirijo a componente confirma compra
    navigate("../confirm", { replace: true });
  };

  return (
    <div className='containerGralCarrito'>
        {
           !carritoUser[0] ?
            <div className='msjCartVacio'>
                <h3 className="carrito">
                  Carrito vacio, ve a agregar productos!
                </h3>
                <Link to="/home" style={{ textDecoration: "none" }}>
                   <Button variant="contained" sx={{ mt: "2.1em" }}>Ir a Productos</Button>
                </Link>
            </div>
            :
            <div>              
                {/* primero creo la tabla, luego mapeo los prod */}
                <table className='tableC'>
                    {/* encabezados */}
                    <thead className='encabC'>
                        <tr>
                            <td></td>
                            <td>Producto</td>
                            <td>Nombre</td>
                            <td>Precio</td>
                            <td>Cant pedida</td>
                            <td>Sub Total</td>
                        </tr>
                    </thead>
                
                    {/* mapeo carrito */} 
                    {
                      carritoUser?.map((p) => (
                      <tbody key={p.idP} className="tableBodyCarrito">
                       <tr>
                            {/* boton elim */}
                            <td style={{width: "40px"}} >
                                <Button onClick={() => handleElim(p.name)} className="btn_elimP">
                                   <Delete fontSize="large" />
                                </Button>
                            </td>
                            {/* img prod */}
                            <td className='imagenTablaVenta'>
                                <img src={p.imagen} alt={p.name} style={{ width: "70px", height: "auto" }}/>
                            </td>

                            {/* nomb prod */}
                            <td>{p.name}</td>

                            {/* precio - descuento */}
                            <td>${Math.round(p.price * (100 - p.discount) / 100)}.00</td>

                            {/* cant pedida */}
                            <td>{p.quantity}</td>     
                                
                            {/* precios finales */}
                            <td>${p.quantity * (Math.round(p.price * (100 - p.discount) / 100))}.00</td>
                        </tr>
                      </tbody>
                      ))
                    }      
                </table>  
                
                {/* muestra total */}
                {/* <ShoppingCarTotal /> */}        
                <div className='resumenTot'>
                  <h4>Resumen</h4>
                  <p>
                    <h5>Total: ${total}.00</h5>
                  </p>     
                </div>

                <Button onClick={handleComprar} fullWidth sx={{ mt: "10px" }} variant="contained">
                  {" "}COMPRAR{" "}
                </Button>{" "} 
            </div>
        }

    </div>
  )
}

export default Carrito