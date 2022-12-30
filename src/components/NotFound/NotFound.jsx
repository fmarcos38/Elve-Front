import React from "react";
import './NotFound.css';
import notfound from './notF.gif';

export default function NotFound(){
 
    return(
        <div className="notfound-cont">

          
            <h3 className="texto">NO se encontraron productos. Vuelva a inicio!! </h3>
          

          <div className="div-gif">
          <img src={notfound} alt={'not found'} className={"gif-dog"}/> 
          </div>
                     
          
        
        </div>
    )
}