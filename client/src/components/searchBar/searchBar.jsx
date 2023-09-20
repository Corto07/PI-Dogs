import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/action";
import style from "./searchBar.module.css";

export default function SearchBar() {
  const [searchDog, setSearchDog] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.preventDefault()
    setSearchDog(e.target.value)
}

  function handleSubmit(e) {
    e.preventDefault();
    if (searchDog.length === 0) {
      return alert("Ingrese un nombre por favor...!");
    } else {
      dispatch(getDogName(searchDog));
      setSearchDog("");
    }
  }

  return (
    <div className={style.divBotton}>
      
      <input
        className={style.input}
        type="text"
        placeholder="Ingrese la Raza del Perro"
        value={searchDog}
        onChange={handleInput}
        required
      />

      <label className={style.label} htmlFor="Raza"></label>
  
      <button type="submit" onClick={handleSubmit} className={style.botton}>Buscar</button>
   
    </div>
  );
}