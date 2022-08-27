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

  const [Person, setPerson] = useState('');
//  const [data, setdata] =useState("aaaasss");

 const [info, setinfo] = useState([
  {key:"1",
  Name:"Sammy"},
  {key:"2",
  Name:"Corw"},
  {key:"3",
  Name:"Minnie"},
 ])


// useEffect(() => {
//   const getData = async () => {
//     const fetchdata = await getDocs(collection(db,"Users"))
//     setinfo(fetchdata.docs.map((doc)=> ({...doc.data(),id:doc.id})))
//     console.log(info)
//   }
//   getData();
// }, [])

  // function addUser() {
  //   addDoc(collection(db, "Users TEst"), {
  //     Rubbish: Person,
  //   })
  //     .then(() => {
  //       console.log("Data Added Successfully", data);
  //       Alert.alert("Data Added Sucessfully");
  //       if (Person) setdata([...data, { Person: Person }]);
  //       console.log(data)
  //       // nameAdd();
  //     })
  //     .catch((error) => {
  //       console.log("error");

  //     });
  // }

  function check () {
    console.log(info)

  }


  const addName = async ()=>
  {
    console.log(Person)
    const newName = {
      key:Math.random,
      Name:Person
    }
    setinfo([...info,newName])
  }
 


  const nameGet = async() => {
    try {
      const add = await AsyncStorage.getItem('name')
      const output = JSON.parse(add)
      // setdata(output) {NEed to cehck this after a WHILE}
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
  }, [])
  




// const getName = async() =>{
//   try{
//     const info =await AsyncStorage.getItem('Name');
//     const output= JSON.parse(info)
//     setdata(output)
    
//   }catch(error){
//     console.log(error)

//   }
// }

// useEffect (() => {
//   saveName(data);
// },[data])

// useEffect (() => {
//   getName();
// },[])


useEffect(()=> {
  async function tempfunction (){
    await fetchName();
    
  }
  tempfunction();
},[])

const clearname = async() => {
    try {
    await AsyncStorage.clear();
    console.log('Done');
    } catch (error) {
    console.log(error);
    }
    ;
}
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

      <Button title="Add User" onPress={addName} />

      {/* <Button title="cehck" onPress={check} /> */}

      {/* <Button title="Remove User" onPress={deleteitem} /> */}


      <TouchableOpacity 
  style={Styles.arrow}
  onPress={() => Navigation.navigate("Input")}> 
    {/* <Feather 
    name="arrow-right"
    size={30}
    color={'#4D8BF6'}  /> */}
  </TouchableOpacity>

  
  {/* For the time being  */}

<FlatList
data={info}
keyExtractor={(item,index)=> index.toString()}
renderItem ={({item})=>(
  <View style={{flexDirection:'row'}} >
    

    <TouchableOpacity onPress={() => Navigation.navigate('Input')} style={Styles.list}> 

    <Text style={{flex:1,fontSize:20,fontWeight:'bold',fontStyle:'italic',paddingRight:120}}>{item.Name}</Text>
    </TouchableOpacity>



<TouchableOpacity onPress={'deleteName'}>

    <Feather
    name="trash-2"
    size={25}
    style={{paddingHorizontal:30,paddingVertical:15,}}
    />
 
</TouchableOpacity>

  </View>

)}/>

{/* {
  info.map((item)=>(
    <View>
      <Text>{item.Name}</Text>
    </View>
  ))
} */}

{/* <FlatList 
data={data}
keyExtractor={(item, index) => String.index}
renderItem={({item})=> (
  <View style={{borderBottomWidth:2}}> 
    <Text style={{fontSize:20,color:'black'}}> {item.name}</Text>
  </View>

)}  /> */}

<TouchableOpacity onPress={clearname}> 
  <View style={{paddingTop:30,justifyContent:'center',alignItems:'center'}}>

  {/* <Feather
  name="trash-2"
  size={35}
  color='coral'>

  </Feather> */}
  </View>
</TouchableOpacity>
 


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
