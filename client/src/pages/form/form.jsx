import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postDog, getTemperament} from "../../redux/action";
import styles from "./form.module.css";
import axios from "axios";

function validateForm(input) {
  let errors = {};

  // Validar el nombre
  if (!/^[a-zA-Z ]+$/.test(input.name)) {
    errors.name = "Ingresar un Nombre válido";
  } else if (input.name.length > 30) {
    errors.name = "El nombre debe tener máximo 30 caracteres";
  } else {
    errors.name = "";
  }

  // Validar la imagen
  if (!/^https?:\/\/\S+\.\S+/i.test(input.image)) {
    errors.image = "Ingrese una URL válida";
  } else {
    errors.image = "";
  }

  // Validad la vida
  if (!(input.life_span)) {
    errors.life_span = "Ingresar un valor válido";
  } else {
    errors.life_span = "";
  }
  
  // Validar el WEIGHTS
  const weightMin = Number(input.weight_min);
  const weightMax = Number(input.weight_max);

  if (!input.weight_min) {  // Peso min
    errors.weight_min = "Ingrese un valor numérico";
  } else if (weightMin < 0 ||  weightMin > 50) {
    errors.weight_min = "Ingrese un peso mínimo entre 0 y 50 kg.";
  } else {
    errors.weight_min = "";
  }
  if (!input.weight_max) {  // Peso max
    errors.weight_max = "Ingrese un valor numérico";
  } else if (weightMax < 1 || weightMax > 100) {
    errors.weight_max = "Ingrese un peso máximo entre 1 y 100 kg.";
  } else {
    errors.weight_max = "";
  }
  if (weightMax <= weightMin) {
    errors.weight_max = "El peso máximo debe ser mayor que el peso mínimo";
  }
    if (!errors.weight_max) {
    errors.weight_max = "";
  }

  // Validar el HEIGHTS
  const heightMin = Number(input.height_min);
  const heightMax = Number(input.height_max);

  if (!input.height_min) {    // Altura min
    errors.height_min = "Ingrese un valor numérico";
  } else if (heightMin < 0 || heightMin > 50) {
    errors.height_min = "Ingrese una altura mínima entre 0 y 50 cm.";
  } else {
    errors.height_min = "";
  }
  if (!input.height_max) {    // Altura max
    errors.height_max = "Ingrese un valor numérico";
  } else if (heightMax < 5 || heightMax > 150) {
    errors.height_max = "Ingrese una altura máxima entre 5 y 150 cm.";
  } else {
    errors.height_max = "";
  }
  if (heightMax <= heightMin) {
    errors.height_max = "La altura máxima debe ser mayor que la altura mínima";
  } // Asegurarse de no sobrescribir el error si la validación del rango es correcta
  if (!errors.height_max) {
    errors.height_max = "";
  }
  
  return errors;
}

export default function DogCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate() //se usa para redirigir a alguna ruta //v de react reemplaza a useHistory
  const temperaments = useSelector((state) => state.temperaments) //me traigo el estado de temperament
    
  const [errors, setErrors] = useState({
    name: "",
  // Otros errores...
     nameExists: "", 
  })

  const [input, setInput] = useState({
    name: "",
    image:"",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    life_span: "",
    temperaments: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    const selectedTemperament = e.target.value;
      if (input.temperaments.length < 6 && !input.temperaments.includes(selectedTemperament)) {
        setInput({
          ...input,
          temperaments: [...input.temperaments, selectedTemperament],
        });

        setErrors({
          ...errors,
          temperaments: "",
        });
      } else if (input.temperaments.length >= 6) {
        setErrors({
          ...errors,
          temperaments: "No se pueden agregar más de 6 temperamentos.",
        });
      } else if (input.temperaments.includes(selectedTemperament)) {
        setErrors({
          ...errors,
          temperaments: "El temperamento ya ha sido seleccionado.",
        });
      }
    }


  function handleDelete(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== el),
    });
  }

  async function checkIfNameExists (name) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      console.log(response)
      
      if (response.status === 200) {
        const data = response.data;
        return data.length > 0; // Si la longitud es mayor que 0, el nombre ya existe
      } else {
        throw new Error('Error al consultar la API');
      }
    } catch (error) {
      console.error('Error:', error);
      return false; // En caso de error, asumimos que el nombre no existe
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validar si el nombre ya existe
    const nameExists = await checkIfNameExists(input.name);

    if (nameExists) {
      alert('>>> El nombre del perro ya existe...! 😕 <<<');
      setErrors({
        ...errors,
        nameExists: 'El nombre del perro ya existe... Modifique el nombre'
      });

  } else if (
      !errors.name &&
      !errors.image &&
      !errors.weight_min &&
      !errors.weight_max &&
      !errors.height_min &&
      !errors.height_max &&
      !errors.life_span
    ) {
      alert(">>> Su perro ha sido creado con éxito...! <<< 🐶");
      dispatch(postDog(input));
      setInput({
        name: "",
        image:"",
        weight_min: "",
        weight_max: "",
        height_min: "",
        height_max: "",
        life_span: "",
        temperaments: [],
      });
      navigate('/home') //cdo termine de crear el dog, q me redirija al home
    } else {
      return alert(">>> ⛔ Algo salió mal o faltan completar campos. Por Favor intente de nuevo. ⛔ <<<");
    }
  }

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={styles.mainContainerCreation}>
        <form onSubmit={(e) => handleSubmit(e)}>
        
          <div className={styles.formContainer}>

            <div className={styles.containerSuperior}>
              <h1 className={styles.Nombre}>Formulario de creación</h1>
            </div>
        
            <div className={styles.container_1}>
              <div className={styles.Section}>
                <label className={styles.label}>Nombre de la raza:</label>
                  <input
                    className={`${styles.sidebar_box} ${input.name ? styles.nonEmpty : styles.empty}`}
                    type="text"
                    value={input.name}
                    name="name"
                    placeholder="Firulais Grand Argentino"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                <div>
                  <p className={styles.error}>{errors.name}</p>
                </div>
                <div>
                  <p className={styles.error}>{errors.nameExists}</p>
                </div>
            
                <label className={styles.label}>Imagen URL:</label>
                  <input
                    className={`${styles.sidebar_box} ${input.image ? styles.nonEmpty : styles.empty}`}
                    type="url"
                    value={input.image}
                    name="image"
                    height="140px"
                    placeholder="https://www.anipedia.net/imagenes/nombres-de-perros-800x375.jpg"
                    onChange={(e) => handleChange(e)}
                  />
                <div>
                  <p className={styles.error}>{errors.image}</p>
                </div>
              </div>  
            </div>
 

            <div className={styles.container_2}>
              <div className={styles.Section}>
                <h4 className={styles.label}>Altura en cm.</h4>
                  <label className={styles.labelMaxMin}>Min</label>
                  <input
                    className={`${styles.sidebar_box} ${input.height_min ? styles.nonEmpty : styles.empty}`}
                    type="number"
                    value={input.height_min}
                    name="height_min"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                <div>
                  <p className={styles.error}>{errors.height_min}</p>
                </div>
                  <label className={styles.labelMaxMin}>Max</label>
                  <input
                    className={`${styles.sidebar_box} ${input.height_max ? styles.nonEmpty : styles.empty}`}
                    type="number"
                    value={input.height_max}
                    name="height_max"
                    placeholder="150"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                <div>
                  <p className={styles.error}>{errors.height_max}</p>
                </div>
              </div>
              
              <div className={styles.Section}>
                  <h4 className={styles.label}>Peso en Kg.</h4>
                    <label className={styles.labelMaxMin}>Min</label>
                  <input
                    className={`${styles.sidebar_box} ${input.weight_min ? styles.nonEmpty : styles.empty}`}
                    type="number"
                    value={input.weight_min}
                    name="weight_min"
                    placeholder="0"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                <div>
                  <p className={styles.error}>{errors.weight_min}</p>
                </div>
                  <label className={styles.labelMaxMin}>Max</label>
                    <input
                      className={`${styles.sidebar_box} ${input.weight_max ? styles.nonEmpty : styles.empty}`}
                      type="number"
                      value={input.weight_max}
                      name="weight_max"
                      placeholder="100"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                <div>
                  <p className={styles.error}>{errors.weight_max}</p>
                </div>
              </div>
              <div className={styles.buttonSection}>
                <Link to="/home/">
                  <button className={styles.buttonCancel}>Cancelar</button>
                </Link>
              <button className={styles.button} type="submit">
                Aceptar 🐕
              </button>
            </div>
            </div>

            <div className={styles.container_3}>
              <div className={styles.Section}>
                  <label className={styles.label}>Años de vida</label>
                    <input
                      className={`${styles.sidebar_box} ${input.life_span ? styles.nonEmpty : styles.empty}`}
                      type="text"
                      value={input.life_span}
                      name="life_span"
                      placeholder="12 - 15 years"
                      onChange={(e) => handleChange(e)}
                    />
                  <div>
                    <p className={styles.error}>{errors.life_span}</p>
                  </div>
              </div>

            </div>

            <div className={styles.container_4}>
              <div className={styles.Section}>
                <label className={styles.label}>Temperamentos</label>
              
                <select onChange={(e) => handleSelect(e)} className={styles.styled_select}>
                
                {temperaments.map(t => (
                        <option value={t.name} key={t.name}>{t.name}</option>
                ))}

              </select>

              <div className={`${styles.sidebar_box} ${input.temperaments ? styles.nonEmpty : styles.empty}`}>
                
                {!input.temperaments.length && (
                  <h4 className={styles.textoTemp}>Selección de temperamentos</h4>
                )}
                
                {input.temperaments.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                
                    <p className={styles.selTemp}>{`${el}`}</p>
                
                    <button className={styles.botton} onClick={() => handleDelete(el)}>x</button>
                  </div>
                ))}
              </div>
            
              <div>
                  <p className={styles.error}>{errors.temperaments}</p>
              </div>

            </div>
            
            </div>
          </div>  
        </form>
        </div>
    </Fragment>
  );
}
