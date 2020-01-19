import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/auth/LoginScreen";
import PatientRegister from "../screens/auth/PatientRegister";
import HospitalRegister from "../screens/auth/HospitalRegister";
import ChoiceScreen from "../screens/auth/ChoiceScreen";

import { Platform, StatusBar } from "react-native";
const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const authStack = createStackNavigator(
  {
    login: LoginScreen,
    patientRegister: PatientRegister,
    hospitalRegister: HospitalRegister,
    choice: ChoiceScreen
  },
  {
    initialRouteName: "login",
    defaultNavigationOptions: {
      title: "login"
    }
  },
  {
    style: headerStyle
  }
);

export default authStack;
