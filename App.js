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
      <Stack.Navigator >

      <Stack.Screen
         name="Report" 
         component={Report}
         options={{
          headerTintColor:'white',
          headerStyle:{

            backgroundColor:'coral',
          },
          headerTitleStyle:{
            fontWeight:'bold',
            fontSize:30
                      
          }}}
         ></Stack.Screen>

<Stack.Screen 
        name ="Home" 
        component={Home}
        options={{
          title: 'Home', //Set Header Title
          headerStyle: {
            backgroundColor: 'coral', //Set Header color
          },
          headerTintColor: 'white', //Set Header text color
          headerTitleStyle: {
            fontWeight:'bold', //Set Header text style
            fontSize:30
          },
        }}
        ></Stack.Screen>

        <Stack.Screen
         name="Input"
         component={Input}
         options={{
          title: 'Input', //Set Header Title
          headerStyle: {
            backgroundColor: 'coral', //Set Header colo
          },
          headerTintColor: 'white', //Set Header text color
          headerTitleStyle: {
            fontWeight:'bold', //Set Header text style
            fontSize:30 
          },
        }}></Stack.Screen>


         
        
      </Stack.Navigator>
    </NavigationContainer>
  )
        }
