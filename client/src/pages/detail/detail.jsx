import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteDetails, getDetails } from '../../redux/action';
import style from "./detail.module.css"

export default function DogDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

useEffect(() => {
    dispatch(getDetails(id));
    return () => {dispatch(deleteDetails())};
}, [dispatch, id]);

const details = useSelector((state) => state.detail);

let name, image, temperamentDog = [], height, weight, life_span;

    if (details[0]) { //una vez ya se hayan traido los datos renderizalos
       name = details[0].name;
       image = details[0].image;
       height = details[0].height;
       weight=  details[0].weight;
       life_span = details[0].life_span;

        if (details[0].temperaments && details[0].temperaments[0]) {
            temperamentDog = [...details[0].temperaments]
        }

        if (details[0].temperaments && details[0].temperaments[0] && details[0].temperaments[0].name) {
            temperamentDog = details[0].temperaments.map(temp => temp.name)
        }
    };

return (
  <Fragment>
    
      <div className={style.containerFondo}> 
            
        <div className={style.containerDescripcion}>    
            
          <div className={style.containerSuperior}>
            <Link to='/home'>
              <button type="submit" className={style.Home}>Home</button>
            </Link>
              <h1 className={style.Nombre}>{name}</h1>    
          </div>
          
          <div className={style.containerIzquierdo}>
            <img className={style.Imagen} src={image} alt={name} width="400px" height="auto"/>
          </div>
            
          <div className={style.containerDerecho}>           
            <h1 className={style.TemperamentoTitulo}>Temperamento</h1>
                <span className={style.TemperamentoTexto}>
                {
               temperamentDog.map((temp) => `${temp}`).join(', ')
               }
                </span>
            
            <br/>
            <h2 className={style.PesoTitulo}>Peso promedio en Kg.</h2>
            <span className={style.AlturaTexto}> 
                {`${weight && weight[0]} - ${weight && weight[1]} kg`}</span>
                           
            <h2 className={style.AlturaTitulo}>Altura promedio en cm.</h2>
              <span className={style.AlturaTexto}>
                {`${height && height[0]} - ${height && height[1]} cm`}</span>

            <br/>
            <h2 className={style.YearsTitulo}>Años de vida</h2>
              <span className={style.YearsTexto}> {typeof life_span === 'string' && life_span.includes("years") 
              ? life_span 
              : life_span + " years"} </span>
              
            <br/>
          </div>
        </div>      
      </div>    
      
    </Fragment>
  );
}




            