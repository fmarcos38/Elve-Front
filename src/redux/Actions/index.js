
import axios from "axios";
import {url} from "../../urls";
import {
  LOAD, LOGIN, GET_USERS, ADD_FAVS, GET_ALL_FAV, GET_CATEGORIES, GET_CARRITO_USER, GET_PRODUCTOS,
  POST_COMPRA, GET_COMPRAS, MERCADO_PAGO, GET_COMPRAS_USER, GET_USER_BY_ID, GET_USER_ADDRESS,
  POST_USER_ADDRESS, UPDATE_USER_ADDRESS, GET_COMPRA_DETALLE, FILTRA_MENU, RESET, GET_PRODUCT_BY_ID,
  GET_CATEGORY_BY_ID, ELIM_PROD, FILTRA_PRICE, FILTRA_AZ_ZA, GET_PROD_BY_NAME, FILTRA_CAT, 
  GET_COMPRAS_USER_BY_NAME, RESET_COMPRAS, GET_VENTAS_POR_DIA, VENTAS_POR_MES,
} from './actionsType';
import LoginControler from '../../localStorage/loginControler';

//-----USUARIOS-----------------------------------------------------------
export function getUsers(){
    return async function(dispatch){
        const resp = await axios.get(`${url}/users` );
        return dispatch({type: GET_USERS, payload: resp.data});
    } 
};
export function registrarse(data){
    return async function(dispatch){
      await axios.post(`${url}/users/registrarse`, data)
    }
};
export function validaCuenta(token){
    return async function(){
        //console.log("tokenAction:", token)//llega bien
        /* const resp = */ await axios.get(`${url}/auth/validaCuenta/${token}`);
        /* return dispatch({type: VALIDA_CUENTA, payload: resp.data}); */
    }
};
export function login(data){
    return async function(dispatch){
        const resp = await axios.post(`${url}/auth/login`, data);
        //cargo en el lacalStorage la data del user
        if (resp.data.token) {
            //asigno data al localStorage
            localStorage.setItem('user', JSON.stringify(resp.data));
            return dispatch({type: LOGIN, payload: "ok"});
        }else{
            return dispatch({type: LOGIN, payload: "nook"});
        }        
    }
};
export function logout(){
    localStorage.removeItem('user');
    //localStorage.removeItem("ShoppingCar");
    //localStorage.removeItem("favorites");
};
export function getUserById (_id) {
    return async function(dispatch){
      const resp = await axios.get(`${url}/users/${_id}`);
      return dispatch({type: GET_USER_BY_ID, payload: resp.data});
    }
}
export function deleteUser (_id){
    return async function(){      
      await axios.delete(`${url}/users/deleteUser/${_id}`);
    }
}
export function actualizaName (_id, data){
    return async function(dispatch){
      axios.put(`${url}/users/actualizaName/${_id}`, data);      
    }  
};
export function actualizaPass (_id, data){
    return async function(){    
      axios.put(`${url}/users/actualizaPass/${_id}`, data);    
    }  
};
//---ADDRESS-------------------------
//--trae direcc de user----
export function getUserAddress(email) {
  return async function(dispatch){
    const resp = await axios.post(`${url}/address/userAddress`, email);
    return dispatch({type: GET_USER_ADDRESS, payload: resp.data})
  }
};
export function createAddress(data){
  return async function(dispatch){
    const resp = await axios.post(`${url}/address/create`, data)
    return dispatch({type: POST_USER_ADDRESS, payload: resp.data});  
  }
};
export function updateUserAddress(id, data){
  return async function(dispatch){
    const resp = axios.put(`${url}/address/modif/${id}`, data);
    return dispatch({type: UPDATE_USER_ADDRESS, payload: resp.data});
  }
}
//---------------------------------------------------------------------------------------
//                                    fin users
//-------------------------------------------------------------------------------------


//---CATEGORIAS--------------------------------------------------------------------------
export function postCategory (data){
    console.log("data:", data)
    return async function(){
      await axios.post(`${url}/categories/create`, data);
    }
};
export function getCategories(){
    return async function(dispatch){
      const resp = await axios.get(`${url}/categories`);
      return dispatch({type: GET_CATEGORIES, payload: resp.data});
    }
};
export function getCategoryByID(_id){
  return async function(dispatch){
    console.log("actionID:",_id)
    const resp = await axios.get(`${url}/categories/getById/${_id}`);
    return dispatch({type: GET_CATEGORY_BY_ID, payload: resp.data});
  }
}
export function elimCat(_id){
    let headers = LoginControler();
    
   return async function(){
       await axios.delete(`${url}/categories/elimCat/${_id}`, headers);
   }
};
//---------------------------------------------------------------------------------------
//                                    fin categorias
//---------------------------------------------------------------------------------------


//-----PRODUCTOS-------------------------------------------------------------------------
export function creaProd(data){
    return async function(){
        console.log("data:", data);
        await axios.post(`${url}/products/create`, data);
    }
}
export function getProductos(){
    return async function (dispatch) {
      dispatch({type: LOAD}); 

      let resp = await axios.get(`${url}/products`);
      return  dispatch({ type: GET_PRODUCTOS, payload: resp.data });    
    };
};
export function getProductByID(_id){
  return async function(dispatch){
    const resp = await axios.get(`${url}/products/getProdByID/${_id}`);//cambie de modif -> a getProdByID
    return dispatch({type: GET_PRODUCT_BY_ID, payload: resp.data});
  }
};
export function elimProd(_id){
  return async function(dispatch){
    const resp = await axios.delete(`${url}/products/elimProd/${_id}`);
    return dispatch({type: ELIM_PROD, payload: resp.data});
  }
}
export function getProductByName(name){
  return async function(dispatch){
    dispatch({type: LOAD});
    
    const resp = await axios.get(`${url}/products/getByName/${name}`);
    console.log("resp.data:", resp.data)
    return dispatch({type: GET_PROD_BY_NAME, payload: resp.data});
  }
}
//---------------------------------------------------------------------------------------
//                                    fin productos
//---------------------------------------------------------------------------------------


//-----FAVORITOS-------------------------------------------------------------------------
export function addFavorites(data){
    return async function(dispatch){
       const resp = axios.post(`${url}/users/favs`, data );
       return dispatch({ type: ADD_FAVS, payload: resp.data })
    }
};
export function getAllFavs(_id){
    return async function(dispatch){
      //console.log("idU:", _id);
      const resp = await axios.get(`${url}/users/favorites/${_id}`)
      return  dispatch({ type: GET_ALL_FAV, payload: resp.data });            
    }
};
export function deleteFav(data){
    return async function(){
        await axios.post(`${url}/users/delete/favs`, data);
    }
}
//---------------------------------------------------------------------------------------
//                                    fin favs
//---------------------------------------------------------------------------------------


//-----CARRITO---------------------------------------------------------------------------
//--agrego prod
export function setShoppingCar (data){
    return async function(){
      return await axios.post(`${url}/users/cart`, data);        
    }
}; 
//--trae
export function getCarritoUser(idU){
    return async function(dispatch){
      const resp = await axios.get(`${url}/users/cart/${idU}`);
      //console.log("carrito:", resp.data);
      return dispatch({type: GET_CARRITO_USER, payload: resp.data});        
    }
};
//--elim prod del carrito
export function deleteProductCart (data){
    return async function(){
      await axios.post(`${url}/users/deleteProd/cart`, data);
    }
}
//--vacia carrito
export const deleteCart = (_id) =>{
    return async function(){
      await axios.delete(`${url}/users/deleteCarrito/${_id}`);
    }
  };
//----mercadopago------------------------------------------------
export function postMP(data){
    return async function(dispatch){
      console.log("dataPostMP:", data);
      const resp = await axios.post(`${url}/users/payment`,data);      
        return dispatch({type: MERCADO_PAGO, payload: resp.data.url});
    };
}
//---------------------------------------------------------------------------------------
//                                    fin carrito
//---------------------------------------------------------------------------------------


//---COMPRAS-----------------------------------------------------------------------------
//-agrega compra
export function postCompra (data){
    return async function(dispatch){
      const resp =await axios.post(`${url}/compras`,data);
      return dispatch({type: POST_COMPRA, payload: resp.data});
    }
}
//--trae todas las compras
export function getCompras(){
    return async function(dispatch){
      //dispatch({type: LOAD});
  
      const resp = await axios.get(`${url}/compras`);
      return dispatch({type: GET_COMPRAS, payload: resp.data});
    }
}
//--trae ordenes del user logueado
export function getComprasUser(_id){
    return async function(dispatch){
      const resp = await axios.get(`${url}/compras/comprasUser/${_id}`);
      return dispatch({type: GET_COMPRAS_USER, payload: resp.data});
    }
  
}
//ventas por nombre
export function getVentasByName(name){
  return async function(dispatch){
    const resp = await axios.get(`${url}/compras/comprasUserByName/${name}`);
    return dispatch({type: GET_COMPRAS_USER_BY_NAME, payload: resp.data});
  }

}
//ventas por dia
export function getVentasProDia(fecha){
  return async function(dispatch){
    const resp = await axios.get(`${url}/compras/getVentasPorDia/${fecha}`);
    return dispatch({type: GET_VENTAS_POR_DIA, payload: resp.data});
  }
}
//ventas x mes
export function getVentasPorMes(mes){
  return async function(dispatch){
    console.log("mes:", mes)
    const resp = await axios.get(`${url}/compras/ventasProMes/${mes}`);
    return dispatch({type: VENTAS_POR_MES, payload: resp.data});
  }
}
export function getCompraDetalle(_id){
  return async function(dispatch){
    const resp = await axios.get(`${url}/compras/compraDetalle/${_id}`);
    return dispatch({type: GET_COMPRA_DETALLE, payload: resp.data});
  }
}
//--actualiza status 
export function actualizaStatus(id, data){//el id q viene es de la compra
    return async function(dispatch){
      axios.put(`${url}/compras/actualizaStatus/${id}`, data );        
    }
}
//--envia mail al realizar la compra
export function sendPurchaseEmail(_id){
    return async function(){
    await  axios.get(`${url}/compras/emailConfirma/${_id}`, /* {headers: authHeader()} */)
    }
};
  //--elimina compra sin abonar
export function eliminaCompraSinAbonar(){
    return async function(){
      await axios.post(`${url}/compras/elimCompra`);
    }
};
export function resetCompras(){
  return{type: RESET_COMPRAS}
}
//---------------------------------------------------------------------------------------
//                                     fin compras
//---------------------------------------------------------------------------------------

//------filtros----------------------------------------------------------------------
//--filtra menu
export function filtraMenu(tipo){
  return{type: FILTRA_MENU, payload: tipo}  
}
export function filtraAZ(tipo){
  return{type: FILTRA_AZ_ZA, payload: tipo}
}
export function filtraPrice(tipo){
  return{type: FILTRA_PRICE, payload: tipo}
}
export function filtraCat(cat){
  return{type: FILTRA_CAT, payload: cat}
}
//---resetea ------
export function reset(){
  return{type: RESET}
}
