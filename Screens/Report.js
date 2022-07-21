import React,{useState} from "react";
import { Text,SafeAreaView,StyleSheet} from "react-native";
import { db } from "../config";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";



export default function Report() {



    return(
        <SafeAreaView>
            <Text> Report</Text>
        </SafeAreaView>
    )
}