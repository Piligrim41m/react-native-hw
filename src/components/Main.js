import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { UseRoute } from "./Router";
import { authStateChangeUser} from '../redux/auth/authOperations'

const Main = () => {
  const { stateChange } = useSelector((state => state.auth));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser(stateChange))
  }, [stateChange]);

  const routing = UseRoute(stateChange);

  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>
  )
}

export default Main;