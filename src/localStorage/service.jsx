import axios from "axios";
import {url} from "../urls";
import loginControler from "../localStorage/loginControler";

//verify account --> al resibir el mail de confirmacion --> user da click y se actualiza a verificado 
//en la DB
const verifyAccount = async() => {
    try {
        const user = await axios.put(`${url}/auth/verifyAccount`, {headers: loginControler()});//le paso por headers el token y el id del user logeado
        //guardo en el localStorage la data del user q viene del back
        localStorage.setItem('user', user.data);
    } catch (error) {
        console.log(error);
    }
}

//retorna la data usuario logueado
const getUserActual = () => {
    return JSON.parse(localStorage.getItem("user"));
};

//logout
const logout =() =>{
    localStorage.removeItem("user");
}

const authService = {
    verifyAccount,    
    getUserActual,
    logout
};

export default authService;