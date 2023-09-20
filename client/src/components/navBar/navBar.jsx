import { Link } from "react-router-dom";
import { refreshPage } from "../../redux/action";
import { useDispatch } from "react-redux";
import style from "./navBar.module.css";
import SearchBar from '../../components/searchBar/searchBar'
// import { useEffect } from "react";

function Navbar () {
  
const dispatch = useDispatch();

function handleClick(e){ //e es evento
  e.preventDefault();
  dispatch (refreshPage()); //me refresca la pagina
}

return (
    <div className={style.container}>
      <div className={style.contanerTitle}>
        <h2 className={style.texto}>Proyecto Individual Henry-Dogs</h2>
        <img className={style.imagen} src="./logo_patita.png" alt="Logo Patita"></img>
      </div>
      
      <div className={style.containerSearch}>           
        <SearchBar/>
      </div>
      
      <div className={style.containerBotonReload}>
      
       
      <button className={style.botonReload} type="submit" onClick={e=> {handleClick(e)}}>Actualizar</button>
    
      </div>
      
      <div className={style.containerBotonCrear}>
      <Link to={'/form'}>
        <button className={style.botonCrear}>Crear Perro</button>
      </Link>
      </div>
    
    </div>
  );
}

export default Navbar;