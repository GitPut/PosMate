import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainAuthed from "./authed/MainAuthed";
import { setUserState, userState } from "state/state";
import MainNonAuth from "./non-authed/MainNonAuth";
import { auth } from "state/firebaseConfig";

const RouteManager = () => {
  const userS = userState.use();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserState(user);
      } else {
        setUserState(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {userS ? <MainAuthed /> : <MainNonAuth />}
    </NavigationContainer>
  );
};

export default RouteManager;
