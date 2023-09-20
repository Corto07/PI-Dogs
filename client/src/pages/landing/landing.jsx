import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import style from "./landing.module.css"

function Landing() {
  return (
    <Fragment>
      <div className={style.container} >
      
              <video autoPlay muted loop controls className={style.video}>
                <source src="./dog_hand_720.mp4" type="video/mp4"/>
              </video>  
              
        <div className={style.title} >
          <h2>PRESENTACION</h2>
          <h2>PRESENTACION</h2>    
        </div>
      
        <div className={style.title2} >  
          <h2 className={`${style.animateTitle2}`}>Proyecto Individual - HENRY Dogs</h2>
        </div>    

        <div className={style.contButton}>    
            <Link to='/home'>
              <button type="submit" className={style.button}>Inicio</button>
            </Link>
        </div>      
        
      </div>
    </Fragment>
  );
}

export default Landing;