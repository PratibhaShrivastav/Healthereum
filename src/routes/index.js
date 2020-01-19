import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Patient from "./patient";
import AuthStack from "./AuthStack";
import Doctor from "./doctor";
import Hospital from "./hospital";
export default createAppContainer(
  createSwitchNavigator(
    {
      patient: Patient,
      auth: AuthStack,
      doctor: Doctor,
      hospital: Hospital
    },
    {
      initialRouteName: "patient"
    }
  )
);
