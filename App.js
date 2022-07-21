import React,{useState} from "react";
import { Text,SafeAreaView,View,TextInput,Button } from "react-native";
import Home from "./Screens/Home";
import Input from "./Screens/Input"
import Report from "./Screens/Report";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Main({navigation}) {


//comment
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle:{
        backgrounfColor:"#F4DO3F"
      }}}>
        <Stack.Screen name ="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Input" component={Input}></Stack.Screen>
        <Stack.Screen name="Report" component={Report}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )

}