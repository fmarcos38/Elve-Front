import React from "react";
import { Link } from "react-router-dom";
import styles  from '../UserProfile/UserOrders.module.css'

export const UserOrders= () => {
  
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>MIS PEDIDOSs</h1>
        </div>

        <nav className="navBar">
          <ul className={styles.ulBreadcrumbs}>    
            <li>             
             <Link to ='/userorders/approved'>PEDIDOS REALIZADOS</Link>
           </li>           
          </ul>
        </nav>
      </div>
    </div>
  );
}





//ACTION
// export const TYPES ={
//   ADD_TO_CART = 'ADD_TO_CART',
//   REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CAR',
//   REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART',
//   CLEAR_CART = 'CLEAR_CART'
// }


// REDUCER

// export const shoppingInitilState = {
//  products: [
//    { id: 1, name: "wine1", price: 100 },
//    { id: 2, name: "wine2", price: 200 },
//    { id: 3, name: "wine3", price: 300 },
//   ],
//  cart: []
// }

// export function shoppingReducer(state,action){
//   switch(action.type){

//   }

// }



