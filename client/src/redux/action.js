import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DETAIL = "GET_DETAILS";
export const DELETE_DETAIL = "DELETE_DETAILS"
export const GET_DOG_NAME = "GET_DOGS_BY_NAME"
export const GET_TEMPERAMENT = "GET_TEMPERAMENTS"
export const POST_DOG = "POST_DOG"
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"
export const FILTER_CREATED = "FILTER_CREATED"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"

const URL_BASE = process.env.URL_SERVER || 'http://localhost:3001/';

export function getDogs() {
  return async function(dispatch) {
    try {
    const response = await axios.get(`${URL_BASE}dogs`);
    return dispatch({
      type: GET_DOGS,
      payload: response.data
    })
    } catch (error) {
      console.log(error)
  }  
  }
}

export function getTemperament () {
  return async function(dispatch) {
    try {
    const response = await axios.get(`${URL_BASE}temperaments`);
    return dispatch({
      type: GET_TEMPERAMENT,
      payload: response.data
    })
    } catch (error) {
      console.log(error)
  }  
  }
}

export function postDog(payload) {
  return async function () {
      const response = await axios.post(`${URL_BASE}dogs`, payload);
      return response;
  }
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      if(id) {
        const response = await axios.get(`${URL_BASE}dogs/${id}`);
          return dispatch({
          type: GET_DETAIL,
          payload: response.data
      })
      } else {
        dispatch({
          type: GET_DETAIL, //cuando se desmonta el detalle
          payload: []   
      })
      } 
    } catch (error) {
      console.error(error)
    }  
  }
}

export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: DELETE_DETAIL
    })
  }
}

export function getDogName(payload) {
  return async function (dispatch) {
    try {  
    const response  = await axios.get(`${URL_BASE}dogs?name=${payload}`);
      return dispatch({
          type: GET_DOG_NAME,
          payload: response.data
      });
    } catch (error) {
      alert('⛔ El perro no existe ⛔');
    }
  }  
}

export function filterDogsByTemperament(payload) { //el payload es el value q me va a llegar
      return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function filterCreated(payload){// el payload es la opcion que yo elija en el form
  return {
      type: FILTER_CREATED,
      payload
  }
}

export function orderByName(payload) {
  return {
      type: ORDER_BY_NAME, //despacho con ese type
      payload
  }
}

export function orderByWeight(payload) {
  return {
      type: ORDER_BY_WEIGHT,
      payload
  }
}

export function refreshPage() {
  return (dispatch) => {
    window.location.reload(); // Recarga la página
  };
};