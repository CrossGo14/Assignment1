import react, { useState,useEffect} from "react";
import { SafeAreaView,Text,View,FlatList,Button,StyleSheet } from "react-native";
import { db } from "../config";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import firebase from 'firebase/app';


export default function Table() {

    const [material,setmaterial]=useState([])

    // const[Book,setBook]=useState([])
    
    // const[Author,setAuthor]=useState([])


    // function getData() {
    //     addDoc (collection(db, "Carl",), {
    //       Book: Book,
    //       Author: Author,
    //       // Name:People,
    //     })
    //       .then(() => {
    //         console.log("Data added succefully");
    //         Alert.alert("Data Added");
    //         {()=> setBook("")}
    //       })
    //       .catch((error) => {
    //         console.log(error);
        
    //       });
    //   }

useEffect(()=>{
  const infofetch= async () => {
    const reportdata = await getDocs(collection(db,"Users"))
    setmaterial(reportdata.docs.map((doc)=> ({...doc.data(),id:doc.id})));
    console.log(material);

  }
  infofetch();
},[])



  //       useEffect(() => {
  //   const fetchdata = async() => {
  //     const bookdata= await getDocs(collection(db,"Carl"));
  //     setmaterial(bookdata.docs.map((doc)=> ({...doc.data(),id:doc.id})))
  //     console.log(material)
  //   };
  //   fetchdata();
  // },[])



  
 

    return(
        <SafeAreaView>
          <Text>
            Hello
          </Text>

          <Button 
          title="Show the Report"
          />

          <FlatList
          data={material}
          renderItem={({item}) =>(
            <View style={{paddingVertical:10,flexDirection:'row',}} >
              
              <View style={{width:70,backgroundColor:'pink',paddingVertical:10,alignItems:'center',fontSize:10000}}>
              <Text> Author : {item.Author}</Text>
              </View>

              <View style={{width:70,backgroundColor:'#1184d6',alignItems:'center'}}>
              <Text>Book: {item.Book}</Text>
              </View>

            </View>
            
          ) }/>


          

        </SafeAreaView>
    )
}
const styles= StyleSheet.create({
  name:{
    fontSize:17,
    fontStyle:'italic'
  },
})