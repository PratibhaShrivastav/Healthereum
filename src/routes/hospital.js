import { createBottomTabNavigator } from "react-navigation";
import Applications from "../screens/hospital/Applications";
import RegisterDoctor from "../screens/hospital/RegisterDoctor";
import SearchPatient from "../screens/hospital/SearchPatient";

import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "react-navigation";
import DetailScreen from "../screens/patient/DetailScreenPatient";
const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const patientResultStack = createStackNavigator({
    search: SearchPatient,
    detail: DetailScreen
}, {
    initialRouteName: "search",
    defaultNavigationOptions: {
        title: "DETAILS"
    },
    headerMode: "none"
}, {
    style: headerStyle
});

const Hospital = createBottomTabNavigator({
    Applications: {
        screen: Applications,
        navigationOptions: {
            tabBarLabel: "Applications"
        }
    },
    RegisterDoctor: {
        screen: RegisterDoctor,
        navigationOptions: {
            tabBarLabel: "RegisterDoctor"
        }
    },
    SearchPatient: {
        screen: patientResultStack,
        navigationOptions: {
            tabBarLabel: "SearchPatient"
        }
    }
}, {
    tabBarOptions: {
        inactiveTintColor: 'grey',
        activeTintColor: 'blue',
        style: {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }
    }
});

export default Hospital;