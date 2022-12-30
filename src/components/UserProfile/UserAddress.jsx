import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalStorage from '../../localStorage/service';

import { getUserAddress } from "../../redux/Actions";
import UserAddressCard from "../UserProfile/UserAddressCard";
import UserAddressForm from "../UserProfile/UserAddressForm";

export default function UserAddress(){

  const dataUserLog = LocalStorage.getUserActual();
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.userAddress);

  useEffect(() => {
    dispatch(getUserAddress(dataUserLog.user.email));
  }, [dispatch]);

  return (
    <div>
      {
        userAddress.address ? 
        (
          <UserAddressCard
            address={userAddress.address}            
            notes={userAddress.notes}
            email={userAddress.email}
          />
        )
        :
        <UserAddressForm/>}
    </div>
  );
};
