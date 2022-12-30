//funcion retornar token
export default function authHeader(){
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user && user.token){
        return {
            'token': user.token,
        }; //le asigo a la variab --> token (user.token)
    
    }else{
        return {}
    }
}

export function SaveToken(tokenHeader){
    localStorage.setItem('token', tokenHeader);
} 
export function SaveId(idUser){
    localStorage.setItem('_id', idUser);
} 
export function SaveRange(role){
    localStorage.setItem('role', role);
} 
export function SaveName(name){
    localStorage.setItem('name', name);
}
export function SaveEmail(email){
    localStorage.setItem('email', email);
}
export function SaveCart(cart){
    localStorage.setItem('cart', cart);
}
export function SaveFav(favorites){
    localStorage.setItem('favorites', favorites);
}
//---------------------------------------------
export function RemoveToken(){
    localStorage.removeItem('token');
} 
export function RemoveId(){
    localStorage.removeItem('_id');
} 
export function RemoveRange(){
    localStorage.removeItem('role');
}
export function RemoveName(){
    localStorage.removeItem('name');
}
export function RemoveEmail(){
    localStorage.removeItem('email');
}
export function RemoveCart(){
    localStorage.removeItem('cart');
}
export function RemoveFav(){
    localStorage.removeItem('favorites');
}