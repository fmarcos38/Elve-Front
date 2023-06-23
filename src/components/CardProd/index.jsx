import React, { useState } from 'react'
import  './cardProd.css';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addFavorites, deleteFav, getCarritoUser,  setShoppingCar, elimProd, 
  } from "../../redux/Actions";
import swal from "sweetalert";

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import authService from '../../localStorage/service';
import { SaveFav } from '../../localStorage';


function CardProd({ _id, name, description, priceG, priceCH, imagen, discount, category}) {

  const user = useSelector(state => state.user);
    //tengo la info q viene del back del user logueado
    let store = authService.getUserActual(); //console.log("dataUser: ", store);
    //estado local para manejar el array de fav
    const [favStorage, setFavStorage] = useState(user.favorites);
    //estodo para la cant pedida
    const [cantPedida, setCantPedida] = useState(1);
    //estado para el precio Segun tamaño prod elegido
    const [precio, setPrecio] = useState(priceG);

    const cart = useSelector((state) => state.cart);  
    const navigate = useNavigate();  
    const dispatch = useDispatch(); 

    /* useEffect(() => {
        if (!store) {
          dispatch(getProductos()); 
          dispatch(getCategories());    
        } else {
          dispatch(getProductos());
          dispatch(getCategories());
          dispatch(getCarritoUser(store.user._id));
          dispatch(getAllFavs(store.user._id));
        }
    }, [dispatch,getAllFavs]); */
    
    const handleSuma = (e) => {
        //no hay stock
        setCantPedida(cantPedida + 1);
    };
    const handleResta = (e) => {
        if(cantPedida === 1){
            return
        }else{            
            setCantPedida(cantPedida - 1);
        }
    };
    const handleRadioB = (e) => {
      setPrecio(e.target.value)
    };
    const handleClickShopping = async(_id) => {
        //si No tngo user logueado --> cuando haga click en el btn carrito reDirijo a registrarse
       if(!store){
          await swal({
               title: "Debe estar Registrado para poder comprar",
               icon: "error",
               button: "Aceptar",
            });
            navigate("/registrarse");
        }else{
            //si SI tengo user log
            //corroboro q el prod a cargar al carrito No exista!!
            let existeProd = cart.find(p => p._id === _id);

             //si no existe dicho prod en el carrito Entoncs
        if(!existeProd){          
            //disparo action q guarda carrito en la DB (trayendome previamnt el estado global)
            dispatch(setShoppingCar({
              idP: _id, 
              quantity: cantPedida, 
              idU: store.user._id,
              price: precio
            }));
            dispatch(getCarritoUser(store.user._id));
            return swal({
              title: "Producto Añadido",
              text: `${name} agregado a carrito`,
              icon: "success",
              button: "Aceptar",
            });          
          }else{
            return swal({
              title: "Producto Existente",
              text: `${name} ya se agregó al carrito`,
              icon: "success",
              button: "Aceptar",
            });
          }
        }
    };    
    const handleFavs = (_id) => {  
    
        if(!store){
          swal({
            title: "Debes estar Registrado para poder agregar a Fav",
            icon: "error",
            button: "Aceptar",
          });
          navigate("/registrarse");
            
        }else{  
          if (!favStorage.find(e => e._id === _id)) {//si el producto NO esta en fav del localStor
            store.user && 
            dispatch(addFavorites({
              idP:_id, 
              imagenP: imagen,
              nameP: name,
              precioPG: priceG,
              precioPCH: priceCH,
              description: description,
              idU: store.user._id
            })); 
            //asigno a state el erray de fav q está en el localStor
            let state = store.user.favorites;
            state.push(_id);//carga array
            //guarda el nuevo array en fav del localStor
            SaveFav(state);
            setFavStorage(state);      
            swal({
              title: "Producto Añadido",
              text: `${name} agregado a Favoritos`,
              icon: "success",
              button: "Aceptar",
            });        
          }
          if (favStorage.find(e => e._id === _id)){            
            dispatch(deleteFav({idP:_id, idU:store.user._id})); //borro de la DB
            //asigno a state el erray de fav q está en el localStor
            let newState = store.user.favorites;
            newState = newState.filter((fav) => fav._id !== _id);
             //guarda el nuevo array en fav del localStor
            SaveFav(newState);
            setFavStorage(newState); 
            swal({
              title: "Prod Eliminado",
              text: `${name} eliminado de Favoritos`,
              icon: "success",
              button: "Aceptar",
            });
          }
        } 
        
        //window.location.reload();
        
    };    
    const handleElimProd = (_id) => {
      dispatch(elimProd(_id))
      swal({
        text: `Borrado con exito..`,
        icon: "success",
        button: "Aceptar",
      });
      navigate('/home')
    };

  return (
    <div className={category === 'Decoración' ? "cont-cardChapa" : "cont-cardP"}>
      {/* etiqta descuento */}
      {
        discount >= 1 &&
        <p className='desc'>
               <strong className={"discuento"}>-{discount}%</strong> 
               <LocalOfferIcon style={{fontSize:'400%',color:'#2fc4ede6', marginLeft:'95%', position:'absolute', zIndex:'110'}}/>
        </p>
      }
      {/* foto */}
      <div className="foto">
        <img src={imagen} alt={"not found"} className={category === 'Decoración' ? "fotoChapa" : "fotoCafe"}/>
      </div>
      {/* nombre Prod */}
      <div className="nombreProd">             
           <h3 className="name">{name.toUpperCase()}</h3>
      </div>
      {/* descrip/caract */}     
      <div className="div-descrip">
          <label className="lab">Descripción:</label>
          <p className="description">{description}</p>
      </div>
      {/* precio */}
      {
        category === "Bebidas Calientes" || category === "Bebidas Frías" ?
        <div className="div-precio">
          {/* Precio para bebidas */}          
          <label className="lab-prcio">
            <input id="radio1" type="radio" value={priceG} checked={precio === priceG ? true : false}
              onChange={handleRadioB}
            />
            Precio T. Grande 340ml(12oz): ${priceG}          
          </label> 
          {
            priceCH > 0 &&
            <>
            <br></br>
            <label className="lab-prcio">          
            <input id="radio2" type="radio" value={priceCH} checked={precio === priceCH ? true : false}
              onChange={handleRadioB} 
            />
              Precio T. Chico 225ml(8oz): ${priceCH}
            </label> 
            <br></br>       
            </>       
          } 
        </div>
        :
        <div className="div-precio">
          {/* Precio para NO-bebidas */}          
          <label className="lab-prcio">
            <input id="radio1" type="radio" value={priceG} checked={precio === priceG ? true : false}
              onChange={handleRadioB}
            />
            Precio: ${priceG}          
          </label>
        </div>
      }
      {/* descuento pantalla chica */}
      <div className='descPantallaCH'>
        {
          discount >= 1 &&
          <label className='descPantallaChica'>Promo: -{discount}%</label>
        }
      </div>

      {/* contador(cant pedida/ para las chapas SOLO 1u x chapa) */}
      {
        category === 'Decoración' ?
        <div>
          <p className="p-textoChapoas">Las chapitas son personalizadas así que solo hay 1u de c/u</p>
          <p className="p-textoChapoas">Para compra x mayor o si qrs mandar tu imagen</p>
          <p className="p-textoChapoas">Comunicate al whatsapp...</p>
          
        </div>
      :
        <div className="contador">
          <label className="labCantPedir">Cant a pedir: </label>
          <Button className='' onClick={handleSuma}><AddIcon /></Button>
            {cantPedida}
          <Button className='' onClick={handleResta}><RemoveIcon /></Button>
        </div>
      }      

      {/* conte-carrito y fav PARA cliente o elim y modif PRAR admin */}
      {
        store?.user.role !== 'admin' &&
        <div className="contCarritoyFav">

        {/* btn-carrito */}       
        <AddShoppingCartIcon disable onClick={() => handleClickShopping(_id)} className={"cardButton"} />          

        {/* btn-fav */}
        <div>
          {
            !store ?
            <FavoriteBorderIcon className={"cardButton"} onClick={() => handleFavs(_id)}/>
            :
            <FavoriteBorderIcon className={favStorage.find(e => e._id === _id) ? "cardButtonFav" : "cardButton"} onClick={() => handleFavs(_id)} />  
          }          
        </div>

        </div>
      }  
      {/* botones Elim y edita P/admin */}
      {
        store?.user.role === 'admin' &&
        <div className="contCarritoyFav">
          {/* btn-elim */} 
          <div> 
            <figure>     
              <button className='btn-elimProd' onClick={()=>handleElimProd(_id)}><DeleteIcon/></button>  
              <figcaption>Elimina Producto</figcaption>       
            </figure>
          </div>
          {/* btn-modif */}
          <div>
            <Link to={`/modifProd/${_id}`}>
              <figure>     
                <button className='btn-elimProd'><EditIcon/></button>   
                <figcaption>Edita Producto</figcaption>       
              </figure>                    
            </Link>          
          </div>

        </div>
        
      }
      
       
    </div>
  )
}

export default CardProd