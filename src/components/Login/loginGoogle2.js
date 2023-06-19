import React from 'react'
//para google-----------------
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



function loginGoogle2() {

    //api google
    const apiKey = process.env.REACT_APP_API_KEY_GOOGLE_AUTH;


    function onSignIn(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        // Envía el token al backend para autenticar al usuario
        fetch('/loginGoogle2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_token: id_token })
        })
        .then(response => {
            console.log("res:",response)
            // Maneja la respuesta del backend
            if (response.ok) {
                // Redirecciona o realiza otras acciones después del inicio de sesión exitoso
                alert("User log");
            } else {
                // Maneja el caso de inicio de sesión fallido
                alert("User no log");
            }
        })
        .catch(error => {
            // Maneja errores de conexión o solicitudes fallidas
            console.log(error);
        });
    };

    /* gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: apiKey
        });
        gapi.signin2.render('google-login-button', {
            'scope': 'email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSignIn
        });
    }); */

    return (
        <div>
            <GoogleOAuthProvider clientId= {apiKey}>
        
                <GoogleLogin 
                    onSuccess={credentialResponse => { console.log(credentialResponse); }}
                    onSignIn={onSignIn}
                    onError={() => { console.log('Login Failed'); }}
                />


        </GoogleOAuthProvider>

        </div>
    )
}

export default loginGoogle2