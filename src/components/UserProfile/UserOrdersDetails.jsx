import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getCompraDetalle } from '../../redux/Actions'
import style from './PurchaseDetail.module.css'

export default function UserOrdersDetail() {
  const dispatch = useDispatch()
  const purchase = useSelector((state)=> state.compraDetalle)
  const { id } = useParams()

  useEffect(()=>{
    dispatch(getCompraDetalle(id))
  },[dispatch,id]);

  console.log(purchase)

  return (
    <div className={style.container}>
      <h2>Detalle de compra</h2>
        <table className={style.table}>
          <thead className={style.tableHead}>
            <tr className={style.tittle}> 
              <th></th>
              <th> Nº </th>      
              <th> Nombre </th>
              <th> Cantidad </th>
              <th> Precio</th>
              <th></th>
          </tr> 
        </thead>
          {
            purchase.cart?.map(((e,index)=>
              <tbody key={e.title} className={style.tableBody} >
                <tr>
                  <td ><img style={{width:'50px'}} src={e.picture_url} alt='not found'/></td>
                  <td>{index + 1}</td>
                  <td>{e.title}</td>
                  <td>x{e.quantity}</td>
                  <td>$ {e.unit_price}</td>                
                  {/* {
                    purchase.status === 'approved' ?   
                      <Link to= {'/userorders/approved/' + e.title} style={{ textDecoration: 'none' }} >
                        <Button variant="contained"  style={{maxWidth: "60px", maxHeight: "60px",
                          minWidth: "25px", minHeight: "25px", backgroundColor: "rgba(45,21,21,255)",                                  fontSize:'10px',
                          marginTop:'25px'}}
                        > 
                          Feedback 
                        </Button>
                      </Link> 
                    : 
                    <p></p>  
                  } */}
                  <td></td>
                </tr> 
              </tbody>
            ))
        }
        <tr className={style.inferiorTabla}>        
          <td></td>
          <td style={{fontSize:'17px'}}>Total:</td>
          <td></td>{/* dejas columna vacia */}
          <td></td>
          <td>${purchase.cart?.map(e=>e.unit_price * e.quantity).reduce((acc, e)=> acc + e, 0)}</td>  
          <td></td>
        </tr>    
        </table>
    </div>
  )
} 