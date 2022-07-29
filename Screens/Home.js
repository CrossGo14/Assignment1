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


export default function Home() {
  const Navigation = useNavigation();

  const [Person, setPerson] = useState('');

  const [data, setdata] = useState([]);

  const [info, setinfo] = useState([]);

useEffect(() => {
  const getData = async () => {
    const fetchdata = await getDocs(collection(db,"Users"))
    setinfo(fetchdata.docs.map((doc)=> ({...doc.data(),id:doc.id})))
    console.log(info)
  }
  getData();
}, [])

  function addUser() {
    addDoc(collection(db, "Users TEst"), {
      Rubbish: Person,
    })
      .then(() => {
        console.log("Data Added Successfully", data);
        Alert.alert("Data Added Sucessfully");
        if (Person) setdata([...data, { Person: Person }]);
        setName();

      })
      .catch((error) => {
        console.log("error");
      });
  }


  const setName = async()=> {
    try{
      data.push(Person)
      const material = JSON.stringify(data);
       
      await AsyncStorage.setItem("userlist",material)
      console.log(data)      
    }catch(error)
    {
       console.log(error)
    }
  };

  const getName = async() => {
    try{
      const name =  await AsyncStorage.getItem("userlist")
      const info= JSON.parse(name)
      setdata(info);
    }
    catch(error) {
      console.log(error)
    }

  } ;

  useEffect (() => {
async function temp (){
  await getName();
  return ()=> {};
}
  },[])


  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row" }}>
        <Text style={Styles.text}> Name </Text>

        <TextInput
          value={String(Person)}
          style={Styles.input}
          placeholder="Enter the adsa's Name"
          onChangeText={(Person) => setPerson(Person)}
        />
      </View>

      <Button title="Add User" onPress={addUser} />

      <TouchableOpacity 
  style={Styles.arrow}
  onPress={() => Navigation.navigate("Input")}> 
    <Feather 
    name="arrow-right"
    size={30}
    color={'#4D8BF6'}  />
  </TouchableOpacity>

      {/* <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => String.index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Navigation.navigate("Input")}>
              <Text style={Styles.flatstyle}>{item.Person} </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      */}

    {/* <FlatList 
    data={info}
    renderItem={({item}) => (
      <View style={{borderBottomWidth:2}}> 
        <Text> {item.Name}</Text>
      </View>
  )} /> */}

  {/* For the time being  */}

  {data.map((item,index)=> {
    return (

      <Text> {item}</Text>
    )
  })}
  

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
    paddingRight: 65,
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
  }
});
