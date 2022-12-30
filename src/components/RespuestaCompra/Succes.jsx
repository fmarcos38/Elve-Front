import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { deleteCart, getComprasUser, getCarritoUser, actualizaStatus, sendPurchaseEmail,
} from "../../redux/Actions";
import LocalStorage from '../../localStorage/service';

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import Style from "./Success.module.css";


export default function Succes() {

  const dispatch = useDispatch();
  const search = useLocation().search;
  const payment_id = new URLSearchParams(search).get("payment_id");//obt el payment_id q viene por url 
  //console.log("payID:", payment_id)
  const status = new URLSearchParams(search).get("status");//obt el status q viene por url 
 
  let store = LocalStorage.getUserActual();//obt todos los datos del user logueado
  //console.log("store:", store);
  const comprasU = useSelector((state) => state.comprasUser);//me llegan todas las compras de dicho user
  //console.log("comprasU:", comprasU);
  //obt el id de la compra actual(de la cual tengo q act stock)
  let idCompra = JSON.parse(localStorage.getItem("idCompra"));
  //console.log("idCompra:", idCompra);
  
  //let STATEorders = useSelector((state) => state.comprasUser);//cambiar --> state.orders por comprasUser  
  const navigate = useNavigate();
  let totalCost = 0;
  
  const data = {
    payment_id: payment_id,    
    status: status === "null" ? "rejected" : status,
  };

  useEffect(()=>{
    dispatch(getComprasUser(store.user._id));
    dispatch(getCarritoUser(store.user._id));
  },[dispatch])

    
  //disparo action para actualizar stock y elimin el carrito ya pagado
  if (status === "rejected" || status === "null") {
    console.log('')
  } else { 
    dispatch(deleteCart(store.user._id));//disparo elim/vacia carrito -paso _id USER-    
  }
  
  useEffect(() => {    
    dispatch(actualizaStatus(idCompra, data));
    //localStorage.removeItem("idCompra");    
  }, []);

  //mandar email
  const email = () => {
    dispatch(sendPurchaseEmail());//le pasao el idUser en la action
    navigate("/userOrders/approved");
  };

  return (
    <div className={Style.hache1}>
      {status === "pending" ? (
        <div className={Style.CompraPendiente}>
          <h1>
            <PriorityHighIcon fontSize="large" />
          </h1>
          <h1 className={Style.subtitle}>Pago pendiente</h1>
          <p>Nuestro equipo de seguridad está revisando tu pago.</p>
          <p>En menos de dos días hábiles, te confirmaremos por</p>
          <p className={Style.subtitle}>e-mail si se acreditó correctamente.</p>
          <h2>
            <Link to="/">
              <button className={Style.buttom}>Inicio</button>
            </Link>
          </h2>
        </div>
      ) : status === "approved" ? (
        <div className={Style.CompraAprobada}>
          <h1>
            <CheckIcon fontSize="large" />
          </h1>
          <h1 className={Style.subtitle}>Transaccion exitosa</h1>
          <p>
            {store.user.name.split(" ").slice(0, 1)}, la compra se ha realizado
            correctamente.
          </p>
          <p>Solicita un email, para conocer mas sobre tu compra</p>
          <p>O puedes ver mas de nuestros productos en Inicio</p>
          <h2>
            <Link to="/">
              <button className={Style.buttom}>Inicio</button>
            </Link>
            <button className={Style.buttom} onClick={email}>
              Enviar Email de confirmacion
            </button>
          </h2>
        </div>
      ) : (
        <div className={Style.CompraCancelada}>
          <h1>
            <CloseIcon fontSize="large" />
          </h1>
          <h1 className={Style.subtitle}> Compra cancelada</h1>
          <p>
            {store.user.name.split(" ").slice(0, 1)}, la compra no salió como
            esperábamos.
          </p>
          <p>
            Corrobore que los datos ingresados hayan sido correctos, puedes
            volver a intentarlo
          </p>
          <p>
            desde nuestro carrito. O puedes seguir consultando por nuestros
            productos en Inicio.
          </p>
          <h2>
            <Link to="/">
              <button className={Style.buttom}>Inicio</button>
            </Link>
            <Link to="/shoppingCar">
              <button className={Style.buttom}>Volver al Carrito</button>
            </Link>
          </h2>
        </div>
      )}
    </div>
  );
}
