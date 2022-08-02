import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { db } from "../config"; 
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  QuerySnapshot,
  Firestore,


} from "firebase/firestore";
import Input from "./Input";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from "@expo/vector-icons";
import { VirtualizedList } from "react-native-web";


export default function Home() {
  const Navigation = useNavigation();

  const [Person, setPerson] = useState('')
  const [data, setdata] = useState([])
  
// useEffect(() => {
//   const getData = async () => {
//     const fetchdata = await getDocs(collection(db,"Users"))
//     setinfo(fetchdata.docs.map((doc)=> ({...doc.data(),id:doc.id})))
//     console.log(info)
//   }
//   getData();
// }, [])

  function addUser() {
    addDoc(collection(db, "Users TEst"), {
      Rubbish: Person,
    })
      .then(() => {
        console.log("Data Added Successfully", data);
        Alert.alert("Data Added Sucessfully");
        // if (Person) setdata([...data, { Person: Person }]);
        console.log(data)
        nameAdd();
      })
      .catch((error) => {
        console.log("error");

      });
  }


  const nameAdd = async()=> {
    try{
      data.push(Person)
      const output = JSON.stringify(data)
      
      await AsyncStorage.setItem('name',output);
      console.log(output)
    }catch(error){
console.log(error)
    }

  }

  const nameGet = async() => {
    try {
      const add = await AsyncStorage.getItem('name')
      const output = JSON.parse(add)
      setdata(output)
    }
    catch(error){
      console.log(error)
          }
  }

  useEffect(() => {
    async function getfunction (){
      await nameGet();
    }
getfunction();
    return () => {  }
  }, [])
  


  const add = () => {
    if(Person == ''){
      Alert.alert('Error','Input is Empty')

    }else{

      console.log(Person)
      const newName ={
        Person:Person
        
      };
      // setdata([...data,newName])
      saveName();
    }
   }

// const saveName = async () => {
//   try{
//     data.push(Person)
//     const stringifyName= JSON.stringify(data)
//     await AsyncStorage.setItem('Name',stringifyName)

//   }catch(error){
//     console.log(error)

//   }
// }

const getName = async() =>{
  try{
    const info =await AsyncStorage.getItem('Name');
    const output= JSON.parse(info)
    setdata(output)
    
  }catch(error){
    console.log(error)

  }
}

// useEffect (() => {
//   saveName(data);
// },[data])

// useEffect (() => {
//   getName();
// },[])



const appendname = () => {
console.log(Person)
}


  const fetchName = async() => {

    try{
      await AsyncStorage.setItem("Name",Person)

    }catch{

    }
  }

useEffect(()=> {
  async function tempfunction (){
    await fetchName();
    
  }
  tempfunction();
},[])

// const deleteusers= async()=> {
//   try{
//     setdata('')
//     await AsyncStorage.removeItem('itemlist')
//   }
//   catch(error){
//     console.log(error)

//   }
// }


  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row" }}>
        <Text style={Styles.text}> Name </Text>

        <TextInput
        value={Person}
        style={Styles.input}
        onChangeText={(text)=> setPerson(text)}
        placeholder='Enter the USers Name'
         />


       
      </View>

      <Button title="Add User" onPress={addUser} />
      {/* <Button title="Remove User" onPress={deleteitem} /> */}


      <TouchableOpacity 
  style={Styles.arrow}
  onPress={() => Navigation.navigate("Input")}> 
    <Feather 
    name="arrow-right"
    size={30}
    color={'#4D8BF6'}  />
  </TouchableOpacity>

  
  {/* For the time being  */}

<FlatList
data={data}
keyExtractor={(item,index)=> String.index}
renderItem ={({item})=>(
  <View style={{flexDirection:'row'}} >
    <View>

    <TouchableOpacity onPress={() => Navigation.navigate('Input')} style={Styles.list}> 

    <Text style={{flex:1,fontSize:20,fontWeight:'bold',fontStyle:'italic',paddingRight:40}}>{item}</Text>
    </TouchableOpacity>
    </View>

<View style={{flexDirection:'column'}}>

<TouchableOpacity onPress={'deleteusers'}>

    <Feather
    name="trash-2"
    size={25}
    style={{paddingHorizontal:30,paddingVertical:20}}  />
 
</TouchableOpacity>
</View>

  </View>

)}/>

{/* <FlatList 
data={data}
keyExtractor={(item, index) => String.index}
renderItem={({item})=> (
  <View style={{borderBottomWidth:2}}> 
    <Text style={{fontSize:20}}> {item}</Text>
  </View>

)}  /> */}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    padding: 15,
    fontSize: 20,
    margin: 10,
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 40,
    marginLeft: 10,
    paddingRight: 70
  },
  flatstyle: {
    padding: 16,
    marginTop: 20,
    borderStyle: "dashed",
    borderColor: "#1E5162",
    borderWidth: 4,
    borderRadius: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 5,
  },
  text: {
    flexDirection: "row",
    flexDirection: "row",
    marginBottom: 0,
    marginTop: 18,
    fontSize: 30,
    fontWeight: "700",
  },
  arrow:{
    justifyContent:'center',
    alignItems: 'center',
  },
  list:{
  flex:1,
  fontSize:20,
  fontWeight:'bold',
  fontStyle:'italic',
  // borderBottomWidth:2,
  // alignItems:'center',
  // justifyContent:'center',
  paddingTop:10,
  marginTop:10
  }

});
