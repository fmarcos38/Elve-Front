import React, { useEffect, useState } from 'react'
import authService from '../../localStorage/service.jsx';
import "./logingoogle.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {loginGoogle} from "../../redux/Actions";

//--para googlg--
//la forma de intalar la dependencia es --> npm install react-google-login --force
//tamb debo instalar --> npm i gapi-script
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';

function LoginGoogle() {

    const apiKey = process.env.REACT_APP_API_KEY_GOOGLE_AUTH;

    const [userActual, setUserActual] = useState(); 
    const dispatch = useDispatch();  
    const navigate = useNavigate(); 

    /* me traigo los users para ver si validó su cuenta */
    const users = useSelector(state => state.users);    

    useEffect(()=>{
        setUserActual(authService.getUserActual());
    },[userActual]);


    //---para google-------------------------------------------------------------
    useEffect(()=>{
            gapi.load("client:auth2", ()=>{
            gapi.auth2.init({clientId: apiKey})
        });
    },[apiKey]);

    //creacion de funciones segun resp del back
    const responseGoogle = (resp) =>{        
        console.log("data: ", resp)
        //busco user
        let buscoUser = users.find(u => u.email === resp.profileObj.email);

        if(!buscoUser){
            Swal.fire('Usuario inexistente.');
        }else{
            if(buscoUser.verified === false){
                Swal.fire('Cuenta sin validar, revisa tu email!!')
            }else{
                if(buscoUser.verified === true){
                    dispatch(loginGoogle({  
                        email: resp.profileObj.email,
                        name: resp.profileObj.name,
                        imageUrl: resp.profileObj.imageUrl
                    }));
                //traer carrito user log
                Swal.fire('Log exitoso.');
                navigate('/home');
                }
            }
                
        }
    }
    //----------------------------------------------------------------------------
    return (
        <div className='contLoginG'>
                <div className="googleBtn">
            
                    <GoogleLogin
                        clientId= {apiKey}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

        </div>
    )
}

export default LoginGoogle;