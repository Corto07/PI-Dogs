import { GET_DOGS, GET_DETAIL, DELETE_DETAIL, GET_DOG_NAME, GET_TEMPERAMENT, POST_DOG, FILTER_BY_TEMPERAMENT, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "../redux/action";

const initialState = { 
  dogs: [],
  allDogs: [], //declaro un estado q siempre va a tener todos los perros
  temperaments: [],
  detail: []
};

function rootReducer(state= initialState, action){
  switch(action.type) {

    case GET_DOGS:
        action.payload.forEach(element => {
          if (!element.temperaments[0]) {
           element.temperaments[0] = "🐶 Sin temperamentos" //eliminamos arreglos vacios de temperamentos
         }
        });
          return {
          ...state, //guardo el estado
          dogs: action.payload, //en mi estado dogs, q en un ppio es un estado vacío, mandà todo lo q te mande la acción de dogs
          allDogs: action.payload //acá tb me guarda todos los perros para q pueda usarlo cdo filtro y q me los cargue a todos de nuevo, y no sobre el filtro del filtro
      }

    case GET_DOG_NAME:
          action.payload.forEach(element => {
            if (!element.temperaments[0]) {
              element.temperaments[0] = "🐶 Sin temperamentos" //eliminamos arreglos vacios de temperamentos
            }
          });
          return {
              ...state,
              dogs: action.payload, //es el arreglo q estoy renderizando
              allDogs: action.payload
          }

      case GET_TEMPERAMENT:
          const filteresTemp = action.payload.filter((temp) => temp.name !== ""); //eliminar razas con strings vacios
      return {
          ...state,
          temperaments: filteresTemp
      }

      case POST_DOG:
          return {
              ...state,
          }

      case FILTER_BY_TEMPERAMENT:
        const allDog = state.allDogs;
        let filteredDogs = [];
        if (action.payload === "All") {
          filteredDogs = allDog;
        } else {
          for (let i = 0; i < allDog.length; i++) {
            let found = allDog[i].temperaments && allDog[i].temperaments.find((t) => t === action.payload);
            let found2 = allDog[i].temperaments && allDog[i].temperaments.find((t) => t.name === action.payload);
            if (found || found2) {
              filteredDogs.push(allDog[i]);
            } //todos los perros en la posicion de ese momento
          }
        }
              return {
                  ...state, //me traiego todo lo de estado
                  dogs: filteredDogs,
                  
      }

      case FILTER_CREATED:
          let filterCreated = action.payload === 'Created' 
          ? state.allDogs.filter(el => el.createDb) 
          : state.allDogs.filter(el => !el.createDb)
          return {
              ...state, //me devuelve el estado anterior
              dogs: action.payload === 'All'
              ? state.allDogs 
              : filterCreated
      }

      case ORDER_BY_NAME: //'Asc. Desc'
          let sortName = action.payload ==='asc'?
          [...state.dogs].sort(function (a, b) {
            if (a.name > b.name)  return 1 
            if (b.name > a.name)  return -1
            return 0;
        }) :
        [...state.dogs].sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (b.name > a.name) return 1;
            return 0;
        })
    return {
        ...state,
        dogs: action.payload === 'All'
        ? state.allDogs
        : sortName
    }


      case ORDER_BY_WEIGHT:
        const sortedWeight = action.payload === 'desc' ?
        [...state.dogs].sort(function (a, b) {

          if (!a.weight[0] || isNaN(parseInt(a.weight[0]))) return 1; 
          if (!b.weight[0] || isNaN(parseInt(b.weight[0]))) return -1;
          return parseInt(a.weight[0]) - parseInt(b.weight[0]);
      }) :
      [...state.dogs].sort(function (a, b) {
          if (!a.weight[0] || isNaN(parseInt(a.weight[0]))) return 1;
          if (!b.weight[0] || isNaN(parseInt(b.weight[0]))) return -1;
          return parseInt(b.weight[0]) - parseInt(a.weight[0]);
        })
    return {
        ...state,
        dogs :sortedWeight
    }

      case GET_DETAIL:
        action.payload.forEach(element => {
          if (!element.temperaments[0]) {
           element.temperaments[0] = "🐶 Sin temperamentos" //eliminamos arreglos vacios de temperamentos
         }
        });
            return {
               ...state,
               detail: action.payload
           }
           
      case DELETE_DETAIL:
          return{
               ...state,
               detail: []
          };
      
      default:
          return state;
  }
};


export default rootReducer;
