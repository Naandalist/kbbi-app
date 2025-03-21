import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import Router from "./router";
import store from "./redux/store";
import { Loading } from "./components";
import { Provider, useSelector } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

function MainApp() {
  const stateGlobal = useSelector((state) => state);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" duration={3000} />
      {stateGlobal.loading ? <Loading /> : null}
    </>
  );
}
