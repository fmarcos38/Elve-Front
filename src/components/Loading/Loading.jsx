import React from "react";
import './Loading.css';
import loading from './loading.gif';

export default function Loading(){

    return(
        <div className="load">
          <h3 className="texto-load">Loading...</h3>

          <img className="gif" src={loading} alt={"not found"} />
        </div>
    )
}