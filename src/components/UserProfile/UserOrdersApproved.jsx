import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComprasUser } from "../../redux/Actions";
import { Link } from "react-router-dom";
import LocalStorage from '../../localStorage/service';
// styles
import styles from "../UserProfile/UserOrders.module.css";
import { Button } from "@mui/material";
import style from '../UserProfile/UserOrderRejected.module.css';

export default function UserOrdersApproved(){
  const dispatch = useDispatch();
  const userHistory = useSelector((state) => state.comprasUser);
  const userLog = LocalStorage.getUserActual();

  useEffect(() => {
    dispatch(getComprasUser(userLog.user._id));
  }, [dispatch]);


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>MIS PEDIDOS</h1>
        </div>

        <nav className="navBar">
          <ul className={styles.ulBreadcrumbs}>
            <li>
              <Link to="/userprofile">HOME</Link>
            </li>

            <li>
              <Link to="/userorders/approved">PEDIDOS REALIZADOS</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.card}>
          <div className={style.backg}>
            <table className={style.table}>
              {
                userHistory.filter((e) => e.status === "approved").length === 0 ? 
                (
                  <thead><tr><td> <h1> No hay pedidos asociados </h1> </td></tr></thead>
                ) 
                : 
                (
                  <thead className={style.tableHead}>
                    <tr>
                      <th>Nº</th>
                      <th  className={styles.id}>ID</th>
                      <th> Cantidad </th>
                      <th>Precio</th>
                      <th>Detalle</th>
                      <th></th>
                    </tr>
                  </thead>
                )
              }
              {
                userHistory.filter((e) => e.status === "approved").length !== 0 ? 
                (
                  userHistory.filter((e) => e.status === "approved")
                  ?.map((e, i) => {
                    return (
                      <tbody className={style.tableBody} key={e._id}>
                        <tr>
                          <td>{i + 1}</td>
                          <td className={styles.id}>{e._id}</td>
                          <td>
                            {" "}
                            x
                            {e.cart
                              .map((e) => e.quantity)
                              .reduce((acc, e) => acc + e, 0)}
                          </td>
                          <td>
                            $
                            {e.cart
                              .map((e) => e.unit_price * e.quantity)
                              .reduce((acc, e) => acc + e, 0)}
                          </td>

                          <td style={{ width: "50px" }}>
                            <Link to={"/user/compra/detalle/" + e._id}>
                              <Button
                                style={{
                                  maxWidth: "30px",
                                  maxHeight: "30px",
                                  minWidth: "25px",
                                  minHeight: "25px",
                                  borderRadius: "80px",
                                  backgroundColor: "rgba(45,21,21,255)",
                                }}
                              >
                                {" "}
                                D{" "}
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) 
                : 
                (
                  <tfoot><tr><td><p></p></td></tr></tfoot>
                )
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};