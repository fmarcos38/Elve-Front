
//funcion q retorn el token del user logueado
export default function LoginControler(){
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    return (
        {
            headers: {
                'token': token,
                '_id': id
            }
        }
    )   
}