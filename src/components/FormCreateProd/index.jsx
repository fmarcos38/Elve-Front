import React, {useState, useEffect} from 'react'
import DivContainer from '../../styledComponents/DivConteiner';
import Button from '../../styledComponents/Button';
import styles from './styles.module.css';
import { getCategories, getProductos } from '../../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import Navbar from '../Navbar';

function FormCreateProd() {

  const initialState = {category: "", name: "", description: "", imagen: "", priceG: "", priceCH: 0, discount: 0, isPromo: false}
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  //estado pre imagen
  const [previewSource, setPreviewSource] = useState('');//vista previa

  const productos = useSelector(state => state.products);
  const buscoProd = productos.find(p => p.name === input.name);

  const categories = useSelector(state => state.categories);
  const buscoCat = categories.find(c => c.name === input.category);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProductos());
    dispatch(getCategories());
  }, [input.category]);

  function validators(input){
    const error = {}

    if(!/^[a-zA-Z\s]*$/.test(input.name)){error.name = "Ingrese solo letra Boludo!!"}
  };
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
    e.preventDefault();
    if( !input.category || !input.name || !input.priceG || !input.imagen || !input.category || !input.description){
      swal({
        title: "Error",
        text: 'Falta completar correctamente el formulario',
        icon: "error",
        button: "Aceptar",
      })
    }else{
    try {
      
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
      fetch(`http://localhost:3001/products/create`, {
        method: "POST",
        body: formData,
      });      
      swal({
        text: `Creado con exito..`,
        icon: "success",
        button: "Aceptar",
      });
      setInput({ category: "", name: "", description: "", imagen: "", priceG: "", priceCH: 0, discount: 0, isPromo: false});
      setPreviewSource('');
      document.ready = document.getElementById("category").value = '0';
      
    } catch (error) {
      console.log(error);
    }
    //window.location.reload();
  }
  };  

  return (
    <>
      <Navbar/>
      <div className={styles.bodyCreateProperty}>
      <h3 className={styles.titleForm}>Publicar producto</h3>

      <form onSubmit={handleSub} className={styles.formLogin}>
        <DivContainer className={styles.login}>
          {/* categ y nombre */}
          <div className={styles.contNameDescrip}>
              {/* categorias */}
              <div className='contCateg'>
                <label className='lab-create'>Selecc Categoría: </label>
                <select id='category' onChange={handleCH} className={styles.selectCat}>
                    <option value={null}>Categorias</option> 
                    {
                      categories[0] ?
                      categories.map(c => (
                        <option key={c._id} value={c.name}>{c.name}</option>//se cambio _id por name en Value
                        )
                      ) : <option>Loading..</option>
                    }
                </select>
              </div> 

              {/* name */}
              <div className={styles.contName}>
                <label className={styles.labForm}>Nombre Prod: </label>
                <input type={'text'} value={input.name} onChange={handleCH} id={'name'} className={styles.inpNameP}/>
                {buscoProd && (<p className={styles.msjError}>Ya existe ese Producto !!</p>)}

              </div>
          </div>            
          
          {/* descrip */}
          <div className={styles.contDescription}>
            <label className={styles.labForm}>Descrip Prod: </label>
             <input  className={styles.inpDescrip} id={'description'} value={input.description} onChange={handleCH} type='text' />
          </div>        

          {/* precios y descuento */}
          <div className={styles.contPriceDescuento}>
            {/* priceG */}
            <div className={styles.contPriceFrom}>
              {
                input.category !== 'Bebidas Calientes' && input.category !== 'Bebidas Frías' ?
                <label className={styles.labPrice}>Precio: </label>
                :
                <label className={styles.labPrice}>Precio T.grande: </label>
              }              
              <input  className={styles.inpPrice} id={'priceG'} value={input.priceG} onChange={handleCH}  type='number' min="10" max="100000"/>
            </div>

            {/* priceCH */}
            {
              buscoCat?.name === 'Bebidas Calientes' &&
              (
                <div className={styles.contPriceFrom}>
                  <label className={styles.labPrice}>Precio T.chico: </label>
                  <input  className={styles.inpPrice} id={'priceCH'} value={input.priceCH} onChange={handleCH}  type='number' min="0" max="100000"/>
                </div>
              )
            }          

            {/* descuento */}
            <div className={styles.contDiscount}>
              <label className={styles.labDesc}>Descuento Prod: </label>
              <input  className={styles.inpDesc} onChange={handleCH}id={'discount'} value={input.discount} type='number'/>
            </div>

            {/* esPromo */}
            <div className={styles.isPromo}>
              <label className={styles.labIsPromo}>Prod en Promoción? </label>
              <input  className={styles.inpIsPromo} onChange={handleCH} id={'isPromo'} value={input.isPromo} type='checkbox'/>
            </div>

          </div>
        
          {/* imagen prod */}
          <div className={styles.contFotoCat}>
                  
            {/* foto */} 
            <div className={styles.contFoto}>
              <label className={styles.labFoto}>Imagen del prod: </label>
              <input className={styles.inpFoto} type="file" accept="imagen/*" id="imagen" onChange={handleCH}/>
            </div>

            {/* muestra foto */}
            <div>
              <img src={previewSource} alt="Sin cargar" className={styles.imgPre}/>
            </div>
          </div> 
          
          {/* btn cargarProd */}
          <div className={styles.contBtn}>
            <Button className={styles.buttonIngresar} type="submit" >Ingresar</Button> 
          </div>
        </DivContainer>
      </form>    
      </div>
    </>
  )
}

export default FormCreateProd