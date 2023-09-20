import React from "react";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs, getTemperament, filterDogsByTemperament, filterCreated, orderByName, orderByWeight } from '../../redux/action';
import style from "./dogArea.module.css";
import DogCard from "../dogCard/dogCard";
import Pagination from "../pagination/pagination";

function DogArea () {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //me lo trae del reducer
  const allTemperaments = useSelector((state) => state.temperaments)
  
  //Paginado: un estado con la pag actual y un estado que me setee la pag actual  
  const[currentPage, setCurrentPage] = useState(1)
  const[dogsPerPage, /*setDogsPerPage*/] = useState(8)
  
  const [/*order*/, setOrder] = useState('')
 
  const indexOfLastDog = currentPage * dogsPerPage // 1 * 8 = 8   mas que un index se refiere a cantidad
  const indexOfFirstDog = indexOfLastDog - dogsPerPage // 8 - 8 = 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
  // pag 1 -----------0--------------8
  // pag 2 -----------9--------------17

  const pagination = (pageNumber) => { //esto va a ser en renderizado
    setCurrentPage(pageNumber)    // setear la pag en ese numero de pagina
  }
 
  //traemos del estado los dogs y los temp cdo el componente se monta
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperament())
  }, [dispatch]);

  function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));//el payload
    setCurrentPage(1); //seteo la pag actual 1
    setOrder(e.target.value);//aca se setea el ordenamiento
 };
 
 function handleFilterTemperament(e){
  e.preventDefault();
  dispatch(filterDogsByTemperament(e.target.value));
  setCurrentPage(1);
  setOrder(e.target.value)
};

function handleWeight(e){
  e.preventDefault();
  dispatch(orderByWeight(e.target.value));
  setCurrentPage(1);
  setOrder(e.target.value);
}
  
function handleFilterCreated(e){
  e.preventDefault();
  dispatch(filterCreated(e.target.value));//el payload
  setCurrentPage(1);
  setOrder(e.target.value);
};

  return (
    <Fragment>
        <div className={style.dogsAreaFiltros}>
        
            <div className={style.filterSection}>    
             
                <select className={style.filterHeaderArea1}onChange={e=> {handleSort(e)}}>
                  <option defaultValue value="all" hidden>Ordenar por nombre</option>
                  <option value='asc'>Ascendente (A-Z)</option>
                  <option value='desc'>Descendente (Z-A)</option>
                </select>
           
              
                <select className={style.filterHeaderArea2}onChange={e => {handleFilterTemperament(e)}}>
                  <option defaultValue value="" hidden>Filtrar por Temperamentos</option>
                  <option value='All'>Todos los Temperamentos</option>  
                    {allTemperaments?.map((el) => {
                      return (
                      <option key={el.id} value={el.name}>
                        {el.name}
                      </option>
                    )
                      })}
                </select>
            
              
                <select className={style.filterHeaderArea3} onChange={e => {handleWeight(e)}}>
                  <option defaultValue value="all"hidden >Ordenar por peso</option>
                    <option value="all">Ordenar por peso</option>
                    <option value="asc">Pesados</option>
                    <option value="desc">Livianos</option>
                </select>
            
              
                <select className={style.filterHeaderArea4}onChange={e => {handleFilterCreated(e)}}>
                  <option defaultValue value="" hidden> Filtrar por Origen del 🐶</option>
                  <option value="All">Todos los 🐶</option>
                  <option value='Created'>Mis creaciones</option>
                  <option value='Api'>Obtenidos de la Api</option>
                </select>
            </div>  

          </div>
          
          <div className={style.pagination}>
            <Pagination
              dogsPerPage={dogsPerPage}
              allDogs={allDogs.length}
              pagination={pagination}
              currentPage={currentPage}
            />      
          </div>
          
          <div className={style.container}>
            {
              currentDogs?.map((el) => {
            
              console.log (el)
  
              return (
                <DogCard
                  key={el.id}
                  id={el.id}  
                  name={el.name}
                  image={el.image}
                  weight={`${el.weight && el.weight[0]} - ${el.weight && el.weight[1]}`}
                  temperaments={el.temperaments && el.temperaments.name ? el.temperaments.map(el => el.name) : el.temperaments}
                /> 
              )
              })
            }
          </div>
    </Fragment>
  );
}

export default DogArea;
