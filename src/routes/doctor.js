import { createBottomTabNavigator } from "react-navigation";
import React from "react";
import MyAppointments from "../screens/doctor/MyAppointments";
import Search from "../screens/doctor/Search";
import { Platform, StatusBar } from "react-native";
import { Icon } from "native-base";

import { createStackNavigator } from "react-navigation";
import DetailScreen from "../screens/patient/DetailScreenPatient";
const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const patientResultStack = createStackNavigator({
    search: Search,
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

const Doctor = createBottomTabNavigator({
    MyAppointments: {
        screen: MyAppointments,
        navigationOptions: {
            tabBarLabel: "MyAppointments",
            tabBarIcon: ({ tintColor }) => ( <
                Icon style = {
                    { marginBottom: 35, marginTop: 10, color: tintColor }
                }
                color = 'activetintColor'
                type = "FontAwesome"
                name = "users" / >
            )
        }
    },
    Search: {
        screen: patientResultStack,
        navigationOptions: {
            tabBarLabel: "Search",
            tabBarIcon: ({ tintColor }) => ( <
                Icon style = {
                    { marginBottom: 35, marginTop: 10, color: tintColor }
                }
                type = "FontAwesome"
                name = "search" / >
            )
        }
    }
},
{
    tabBarOptions: {
        inactiveTintColor: 'grey',
        activeTintColor: 'blue',
        style: {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }
    }
});

export default Doctor;