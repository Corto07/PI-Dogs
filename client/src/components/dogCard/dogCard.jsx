import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import style from "./dogCard.module.css";

export default function DogCard( { id, name, image, weight, temperaments } ) {

  return (
    <Fragment>
      <div className={style.container}>
      
        <div className={style.nombre}>
          <h3 >{name}</h3>
        </div>
        
        <div >
            <Link to={`/home/${id}`}>
              <img 
                className={style.imagen}
                src={image} 
                alt={name}
              />
            </Link> 
        </div>
              
        <div className={style.temp}>   
            {Array.isArray(temperaments) 
              ? temperaments.slice(0, 6).map((temp, index) => (
                typeof temp === 'object' ? temp.name : temp)).join(', ')
              : temperaments
            }
          
                {/* {temperaments && temperaments.map((temps) => `${temps}`).join(', ')} */}
        </div>
           
        <div className={style.peso}>
          <p>Weight: {weight} Kgs</p>
        </div>
      
      </div>
    </Fragment>
  );
} 
