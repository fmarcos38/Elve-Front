import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { elimCat, getCategories, postCategory } from '../../redux/Actions';
import DivContainer from '../../styledComponents/DivConteiner';
import ButtonM from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from './styles.module.css';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function CreaCategorias() {

    const [input, setInput] = useState({name: ""});
    const [errors, setError] = useState({name: ""});
    const categ = useSelector(state => state.categories);
    let buscaCat = categ.find(c => c.name === input.name);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getCategories());
    }, []);

    function validator(input){
      const errors = {};
    
      if(!input.name){ errors.name = "Pleace enter the name !!"; }
      if(!/^[a-zA-ZÀ-ÿ\s]*$/.test(input.name)){errors.name = "Pleace, enter only letters";}
    
      return errors;
    }

    const handleCH = (e) => {
        setInput({name: e.target.value});
        setError(validator({name: e.target.value}));
    }

    const handleSub = (e) => {
      e.preventDefault();
      if(!input.name){
        swal({
            title: "Error",
            text: 'Falta completar correctamente el formulario',
            icon: "error",
            button: "Aceptar",
        });
      }
      if(!/^[a-zA-ZÀ-ÿ\s]*$/.test(input.name)){
        swal({
            title: "Error",
            text: "Pleace, enter only letters",
            icon: "error",
            button: "Aceptar",
        });
      }
      if(buscaCat){
        swal({
          title: "Error",
          text: "Ya existe Categoría con ese nombre",
          icon: "error",
          button: "Aceptar",
        });
      }
      else{        
        dispatch(postCategory(input));
        setInput({ name:'' });
        dispatch(getCategories());
        swal({
          title: "Cat agregada",
          text: `Se agrego correctamente la categoría`,
          icon: "success",
          button: "Aceptar",
        });
        
      }
    };

    const handleClickElimP = (_id) => {
      dispatch(elimCat(_id));
      dispatch(getCategories());
      swal({
        title: "Cat eliminada",
        text: `Se eliminó correctamente`,
        icon: "success",
        button: "Aceptar",
      });
    }; 
    
  return (
    <>
      <Navbar/>
      <div className={styles.bodyCreateProperty}>
      <h3 className={styles.titleForm}>Publicar categoría</h3>

      <form onSubmit={handleSub} className={styles.formCat}>
        <DivContainer>

          {/* name */}
          <div className={styles.contNameCat}>
            <label className='labForm'>Nombre Categoría: </label>
            <input className={errors.name ? styles.errorInput : styles.inpNameCat} type={'text'} id={'name'} value={input.name} 
              onChange={handleCH}/>
            {buscaCat && (<p className={styles.errorSpan}>Ya existe Categoría con ese nombre</p>)}
            {!errors.name ? null : (<p className={styles.errorSpan}>{errors.name}</p>)}
          </div>

          <div className="group">
            <button className={styles.buttonIngresar} id={'btn_cat'} type="submit" >
              Ingresar
            </button> 
          </div>

        </DivContainer>
      </form>

      <h2>Elim Cat</h2>
      <DivContainer className={styles.listaCat}>        

        <div >
          {
            categ[0] ?
            (
              <>
                {/* creo tabla */}
                <table className={styles.table}>
                {/* encabezados tabla */}
                  <thead className={styles.tableHead}>
                    <tr>                      
                      <td>Nombre</td>
                      <td></td>
                    </tr>
                  </thead>
                
                  {/* mapeo categ */}
                  {
                       categ.map(c => (
                       <tbody key={c._id} className={styles.tableBody}>
                        <tr>
                          <td className={styles.itemTable}>{c.name}</td>
                          <td>
                            <ButtonM onClick={() => handleClickElimP(c._id)} styles={{ maxWidth: "35px", maxHeight: "35px", minWidth: "35px", minHeight: "35px" }}>
                              <DeleteIcon fontSize="medium" />
                            </ButtonM>
                          </td>
                        </tr>                        
                       </tbody>
                    ) 
                    ) 
                  }
                </table>
              </>
            )         
            : ( 
                <div>
                  <h2>No hay categorías cargadas</h2>
                </div>
              )
          }
          
        </div>

      </DivContainer>

      </div>
    </>    
  )
}

export default CreaCategorias