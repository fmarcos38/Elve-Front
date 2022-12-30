import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { elimProd, getCategories, getProductByName, reset, filtraAZ, filtraPrice, filtraCat, getProductos } from '../../redux/Actions';
import { Link } from "react-router-dom";
import Navbar from '../Navbar';

import swal from "sweetalert";
import style from './DeleteProduct.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import SearchIcon from '@mui/icons-material/Search';
import {Button}  from '@mui/material';



export default function MuestraListaProds() {

    const allP = useSelector(state => state.resultProducts);
    const allC = useSelector(state => state.categories);
    const [input, setInput] = useState({name: ""});
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProductos());
      dispatch(getCategories()); 
    }, []);
    
    const handlerCL = (e) => {
        switch(e.target.id){
            case 'maxP':
                dispatch(filtraPrice('maxP'));
                break;
            case 'minP':
                dispatch(filtraPrice('minP'));
                break;
            case 'az':
                dispatch(filtraAZ('az'));
                break;
            case 'za':
              dispatch(filtraAZ('za'));
                break;
            case 'categoria':
                dispatch(filtraCat(e.target.value));
                break;
            case 'reset':
              dispatch(reset());
                break;
            default:
                break;

        }        

    };
    const handleElimProd = (_id) => {
        
        swal({
            title: "¿Esta seguro que desea eliminar el producto?",
            icon: "warning",
            buttons: ["Cancelar","Eliminar"]
          })
          .then((willDelete)=>{
            if(willDelete){
                dispatch(elimProd(_id));
              swal({
                title: "Producto Eliminado",
                text: 'Se elimino correctamente el producto',
                icon: "success",
                button: "Aceptar",
              })
              .then(()=>{
                window.location.reload()
              })
            }
          })
    }
    const handleCH = (e) => {
        setInput({name: e.target.value});
    };
    const handleS = (e) => {
        e.preventDefault();
        if(!input.name){
            swal({
                text: `ingresá el nomb del producto, pedazo de boludo!!`,
                icon: "success",
                button: "Aceptar",
            });
        }else{
            dispatch(getProductByName(input.name));
        }
    };

  return (
    <div> 
      <Navbar/>       
      <div className={style.containerLP}>
        {/*---FILTROS Pantalla Pc/Tv--------------------------------- */}
        <div className={style.contFiltros}>
             
              <button className={style.btnFiltro} id={'minP'} onClick={handlerCL}>+ Precio</button>
              <button className={style.btnFiltro} id={'maxP'} onClick={handlerCL}>- Precio</button>                
              
              
              <button className={style.btnFiltro} id={'az'} onClick={handlerCL}>A-Z</button>
              <button className={style.btnFiltro} id={'za'} onClick={handlerCL}>Z-A</button>
              
              
              <select id={'categoria'} onChange={handlerCL} value={'default'} className={style.selectFiltro}>
                <option value={'default'} disabled>Selecc. Categoria</option>
                {
                  allC[0] ? 
                  allC.map(c => (
                    <option key={c._id} value={c.name}>{c.name}</option>
                  )) : <option>Loading...</option>                   
                }
              </select>

              {/* searchBar */}
              <form onSubmit={handleS} className='div-search'>
                 
                 <input className={style.inputSearch} type={'text'} id={'name'} value={input.name} 
                   onChange={handleCH} placeholder={'Nomb prod. ej: Café'}
                 />
                   
                 <input className={style.btnSubmit} type={'submit'} value={'Search'} />                               
        
              </form>               
              
              <button className={style.btnResetFiltro} id={'reset'} onClick={handlerCL}>Resetea Filtros</button>
              
        </div>                                      
        {/*--------------FIN FILTROS Pantalla Pc/Tv------------------ */}
        {/*---FILTROS Smartphone------------------------------------- */}
        <div className={style.contFiltrosPCH}>
             
              <button className={style.btnFiltroPCH} id={'minP'} onClick={handlerCL}>+ Precio</button>
              <button className={style.btnFiltroPCH} id={'maxP'} onClick={handlerCL}>- Precio</button>                
              
              <button className={style.btnFiltroPCH} id={'az'} onClick={handlerCL}>A-Z</button>
              <button className={style.btnFiltroPCH} id={'za'} onClick={handlerCL}>Z-A</button>             
              
              <select id={'categoria'} onChange={handlerCL} value={'default'} className={style.selectFiltroPCH}>
                <option value={'default'} disabled>Por.Categ</option>
                {
                  allC[0] ? 
                  allC.map(c => (
                    <option key={c._id} value={c.name}>{c.name}</option>
                  )) : <option>Loading...</option>                   
                }
              </select>

              {/* searchBar */}
              <form onSubmit={handleS} className='div-search'>
                 
                <input className={style.inputSearchPCH} type={'text'} id={'name'} value={input.name} 
                  onChange={handleCH} placeholder={'Nombre Producto'}
                />
                   
                <button className={style.btnBusca}type={'submit'}><SearchIcon className={style.iconoLupa}/></button>                               
        
              </form>               
              
              <button className={style.btnResetFiltroPCH} id={'reset'} onClick={handlerCL}>Resetea Filtros</button>
              
        </div>                                      
        {/*--------------FIN FILTROS smartphone---------------------- */}

        {/* tabla */}
        <TableContainer>
          <Table component={Paper} sx={{with: '100%'}}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{width:'5%',fontSize:'16px',fontWeight:'600'}}>N°</TableCell>
                    <TableCell sx={{width:'10%',fontSize:'16px',fontWeight:'600'}}>Foto</TableCell>
                    <TableCell sx={{width:'5%',fontSize:'16px',fontWeight:'600'}}>Nombre</TableCell>
                    <TableCell sx={{width:'10%',fontSize:'16px',fontWeight:'600'}}>Categoría</TableCell>
                    <TableCell sx={{width:'10%',fontSize:'16px',fontWeight:'600'}}>Precio T.grande</TableCell>
                    <TableCell sx={{width:'10%',fontSize:'16px',fontWeight:'600'}}>Precio T.chico</TableCell>                            
                    <TableCell sx={{width:'30%',fontSize:'16px',fontWeight:'600'}}>Descripción</TableCell>
                    <TableCell sx={{width:'5%'}}></TableCell>
                    <TableCell sx={{width:'5%'}}></TableCell>
                  </TableRow>
                </TableHead>
                {/* mapeo */}
                     
                {
                  allP?.map((prod,i) => (
                    <TableRow key={prod._id} >
                      <TableCell sx={{width: '5%'}}>{i+1}</TableCell>{/* numera items */}
                      <TableCell sx={{width:'10%'}}>{/* imagen */}
                        <img className='cardImg' src={prod.imagen} alt='image not found'/>
                      </TableCell>
                      <TableCell sx={{width:'10%'}}>{prod.name}</TableCell>{/* nomb prod */}
                      <TableCell sx={{width:'15%'}}>{prod.category}</TableCell>{/* categ prod */}
                      <TableCell sx={{width:'10%'}}>${prod.priceG}.00</TableCell>{/* precio único/tamaño grande */}
                      {/* precio T.chico */}
                      {
                          prod.priceCH > 0 ?
                          <TableCell sx={{width:'10%'}}>${prod.priceCH}.00</TableCell>
                          :
                          <TableCell sx={{width:'10%'}}>No viene</TableCell>
                      }                                
                      <TableCell sx={{width:'30%'}}>{prod.description}</TableCell>{/* descripción */}
                      <TableCell sx={{width:'5%'}}>{/* btn_elimina_prod */}
                        <Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}} 
                          onClick={()=>handleElimProd(prod._id)}>
                            <DeleteIcon fontSize='large'/>
                        </Button>
                      </TableCell>  
                        <TableCell sx={{width:'5%'}}>{/* btn_modif_prod */}
                          <Link to={`/modifProd/${prod._id}`}>
                            <Button 
                              style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',color:'#ff0000'}}
                            > 
                              <EditIcon fontSize='large'/>
                            </Button>
                          </Link>                            
                        </TableCell>                      
                    </TableRow>
                  ))
                }
                    
          </Table>
        </TableContainer> 
      </div>
    </div>
  )
}


