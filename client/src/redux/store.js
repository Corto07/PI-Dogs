import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer'
import { composeWithDevTools } from "redux-devtools-extension";


// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS 

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // esta línea es para poder hacer peticiones a un server
);
export default store;