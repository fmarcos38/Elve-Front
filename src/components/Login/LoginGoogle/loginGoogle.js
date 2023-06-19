import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react'
import authService from '../../../localStorage/service.jsx';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginGoogle } from '../../../redux/Actions';


export default function LoginGoogle(){

    const apiKey = process.env.REACT_APP_API_KEY_GOOGLE_AUTH;
    const [userActual, setUserActual] = useState(); 
    const dispatch = useDispatch();  
    const navigate = useNavigate(); 

    /* me traigo los users para ver si validó su cuenta */
    const users = useSelector(state => state.users);    

    useEffect(()=>{
        setUserActual(authService.getUserActual());
    },[userActual]);
    //decodifico el token
    function decodeJwt(token) {
        const parts = token.split(".");

        if (parts.length !== 3) {
            throw new Error("Invalid token format");
        }
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        return { header, payload };//obt toda la data del payload
    };

    const handleSuccess = (credentialResponse) => {
        //console.log("credentialResponse", credentialResponse);
    
        if (credentialResponse.credential) {
            const { payload } = decodeJwt(credentialResponse.credential);//obt los datos del user
            //console.log("payload credential: ", payload);

            //lo busco por email
            let buscoUser = users.find(u => u.email === payload.email);

            if(!buscoUser){
                Swal.fire('Usuario inexistente.');
            }else{
                if(buscoUser.verified === false){
                    Swal.fire('Cuenta sin validar, revisa tu email!!')
                }else{
                    if(buscoUser.verified === true){
                        dispatch(loginGoogle({
                            email: payload.email,
                            name: payload.name,
                        }));
                    //traer carrito user log
                    Swal.fire('Log exitoso.');
                    navigate('/home');
                    }
                }
                    
            }
        }
    };   
    const handleError = () => {
        console.log("Login failed");
    };   


    return(
        <GoogleOAuthProvider clientId={apiKey}>

            <GoogleLogin onSuccess={handleSuccess}  onError={handleError} />

        </GoogleOAuthProvider>
    )
}
