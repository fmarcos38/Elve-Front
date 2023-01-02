import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getProductByID } from '../../redux/Actions';
import styles from './styles.module.css';
import DivContainer from '../../styledComponents/DivConteiner';
import Button from '../../styledComponents/Button';
import swal from 'sweetalert';


export default function ModifProd() {

  const {_id} = useParams();
  const buscoProd = useSelector(state => state.product);
  const allC = useSelector(state => state.categories);
  const [input, setInput] = useState({category: "", name: "", description: "", imagen: "", priceG: "", priceCH: "", discount: "", isPromo: ""});
  //estado pre imagen
  const [previewSource, setPreviewSource] = useState('');//vista previa
  //me traigo la catego del  prod
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
   dispatch(getProductByID(_id));
  }, []);

  //funcion para manipulación de la pre-imagen
  const previewFile = (file) => {
    const reader = new FileReader();//lector de archivo
    reader.readAsDataURL(file);//convierte la img en una url
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
  };
  const handleCH  = (e) => {
    if(e.target.id === 'imagen'){
      setInput({...input, imagen: e.target.files[0]});
      previewFile(e.target.files[0]);//invoco la funcio q muestra la pre-imagen
    }else if(e.target.id === 'isPromo'){
      if(e.target.checked){
        setInput({...input, isPromo: true})
      }
    }else{
      setInput({...input, [e.target.id]: e.target.value});
      //si actualizo en esta instancia los errors, SALEN miestra el user escribe????????

    }
  }; 
  const handleSub = async (e) => {
    //e.preventDefault();
         
      let formData = new FormData();
      formData.append("imagen", input.imagen);//este nombre "imagen" es el q va en upload.single("imagen") en el back
      formData.append("name", input.name);
      formData.append("priceG", input.priceG);
      formData.append("priceCH", input.priceCH);
      formData.append("category", input.category);
      formData.append("description", input.description);
      formData.append("discount", input.discount);
      formData.append("isPromo", input.isPromo);
      //console.log("data", formData);
      fetch(`http://localhost:3001/products/modifProd/${_id}`, {
        method: "PUT",
        body: formData,
      });          
      swal({
        text: `Modificado con exito..`,
        icon: "success",
        button: "Aceptar",
      });
    setInput({ category: "", name: "", description: "", imagen: "", priceG: "", priceCH: "", discount: "", isPromo: ""});
    navigate('/muestraListProds');
  }
  

  return (
    <div className={styles.bodyModif}>      
      
      <DivContainer className={styles.Data}>
            <h3 className={styles.titleDataActual}>Datos Actuales</h3>
            {/* categ y nombre */}          
            <div>
              <label>Categoría: {buscoProd.category}</label> 
            </div>  
            {/* name */}
            <div>
              <label>Nombre Prod: {buscoProd.name}</label>
            </div>                    
            {/* descrip */}
            <div>
              <label className={styles.labForm}>Descrip: {buscoProd.description}</label>
            </div>
            {/* priceG */}
            {
                buscoProd.category !== 'Bebidas Frías' && buscoProd.category !== 'Bebidas Calientes' ? //cambiar a producto.nombreCat
                <div>
                  <label className={styles.labPrice}>Precio: ${buscoProd.priceG}</label>
                </div>
                :
                <div>
                  <label className={styles.labPrice}>Precio T.grande: ${buscoProd.priceG}</label>
                </div>
            }
            {/* priceCH */}
            {
              buscoProd.priceCH > 0 &&
              (
                <div>
                  <label className={styles.labPrice}>Precio T.chico: ${buscoProd.priceCH}</label>
                </div>
              )
            }            
            {/* descuento */}
            <div>
              <label className={styles.labDesc}>Descuento Prod: {buscoProd.discount}%</label>
            </div>
            {/* esPromo */}
            <div>
                {
                    buscoProd.isPromo === 'true' ?
                    <label className={styles.labIsPromo}>Prod en Promoción: SI</label>
                    :
                    <label className={styles.labIsPromo}>Prod en Promoción: NO</label>
                }              
            </div>
            {/* foto */} 
            <div>
              <label className={styles.labFoto}>Imagen del prod: </label>
              <img src={buscoProd.imagen} alt="Sin cargar" className={styles.imgPre}/>
            </div>
      </DivContainer> 
      
      {/* modif datos */}             
      <form onSubmit={handleSub} className={styles.formLogin}>
        <h3 className={styles.titleForm}>Llenar solo los datos q quieras modif.</h3>
      
        {/* categorias */}
        <label className={styles.labCat}>Selecc Categoría: </label>
        <select id='category' onChange={handleCH} className={styles.selectCat}>
              <option value={null}>Categorias</option> 
              {
                allC[0] ?
                allC.map(c => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                  )
                ) : <option>Loading..</option>
              }
        </select>

        {/* name */}
        <label className={styles.labName}>Nombre Prod: </label>
        <input type={'text'} value={input.name} onChange={handleCH} id={'name'} className={styles.inpNameP}/>
        {/* {buscaUser && (<p className='errorSpan'>ya existe usuario c/ese email</p>)} */}
        <br></br>
          
        {/* descrip */}
        <label className={styles.labDescrip}>Descrip Prod: </label>
        <input  className={styles.inpDescri} id={'description'} value={input.description} onChange={handleCH} type='text' />
        <br></br>

        {/* precios y descuento */}
        {/* priceG */}
        <label className={styles.labCat}>Precio T.grande: </label>
        <input  className={styles.inputPricG} id={'priceG'} value={input.priceG} onChange={handleCH}  type='number' min="10" max="10000"/>
            
        {/* priceCH */}
        {
          buscoProd?.priceCH > 0 &&
          <>
            <label className={styles.labCat}>Precio T.chico: </label>
            <input  className={styles.inputPricG} id={'priceCH'} value={input.priceCH} onChange={handleCH}  type='number' min="0" max="10000"/>          
          </>
        }
       
        {/* esPromo */}
        <label className={styles.labCat}>Prod en Promoción? </label>
        <input  className={styles.inpIsPromo} onChange={handleCH} id={'isPromo'} value={input.isPromo} type='checkbox'/>

        {/* descuento */}
        <label className={styles.labDesc}>Descuento Prod: 
          <input  className={styles.inputDesc} onChange={handleCH}id={'discount'} value={input.discount} type='number'/> 
          %
        </label>        
        <br></br>

        {/* imagen prod */}
        <label className={styles.labCat}>Imagen del prod: </label>
        <input className={styles.inpFoto} type="file" accept="imagen/*" id="imagen" onChange={handleCH}/>

        {/* muestra foto */}
        <img src={previewSource} alt="Sin cargar" className={styles.imgPreModif}/>
        <br></br>
        

        {/* btn-sub */}
        <Button className={styles.btnModificar} type="submit" >Cargar modificaciones</Button> 

      </form>            
        
    </div>
  )
}