import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../config";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import firebase from 'firebase/app'
import { EvilIcons, Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import Report from "./Report";



export default function Input() {

  const [Book, setBook] = useState("");
  const [Author, setAuthor] = useState("");
  const [info, setinfo] = useState([]);

  //navigation constant
  const Navigation = useNavigation();

const[posts,setposts]=useState([]) // Initial empty array of data


  function getData() {
    addDoc (collection(db, "Carl",), {
      Book: Book,
      Author: Author,
      // Name:People,
    })
      .then(() => {
        console.log("Data added succefully");
        Alert.alert("Data Added");
        {()=> setBook("")}
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function readData() {
  //   getDocs(collection(db, "Users")).then((docSnap) => {
  //     let Users = [];
  //     docSnap.forEach((doc) => {
  //       Users.push({ ...doc.data(), id: doc.id });
  //     });
  //   });
  // }

//Main useEffect for fetching the data from Friebase⬇️


  // useEffect(() => {
  //   const fetchdata = async() => {
  //     const bookdata= await getDocs(collection(db,"Carl"));
  //     setposts(bookdata.docs.map((doc)=> ({...doc.data(),id:doc.id})))
  //     console.log(posts)
  //   };
  //   fetchdata();
  // },[])

  function fetchingdata ()
  {
    const fetchdata = async() => {
      const bookdata= await getDocs(collection(db,"Carl"));
      setposts(bookdata.docs.map((doc)=> ({...doc.data(),id:doc.id})))
      console.log(posts)
      console.log("Data read")
    };
    fetchdata();
  }

const bookbutton =(
  <Feather.Button 
  name='book' 
  backgroundColor='#F2F1EE' 
  color='black'
  onPress={()=> Navigation.navigate("Report")} 
  style={{}}
   >
         <Text style={{ fontSize: 15, color: 'black' }}>Report</Text>  
  </Feather.Button>

)


  // useEffect(()=> {
  //   const fetchdata= async() => {
  //     const response = db.collection('Users');
  //     const information= await response.get();
  //     data.docs.forEach(item => {
  //       setposts([...posts,item.information()])
  //     })

  //   } 
  // },[])




  return (
    <SafeAreaView>
  


<TouchableOpacity style={{marginLeft:280}} >
      {bookbutton}
      </TouchableOpacity>



      {/* <View style= {{flexDirection:'row'}}>

        <Text style={{paddingTop:30,paddingRight:20,fontSize:15,fontWeight:'700'}}> User's Name</Text>


<TextInput 
        style={styles.inputcontainer1}
        placeholder={"Enter the User's Name"}
        value={People}
        onChangeText={(People)=> setPeople(People)}
        />
      </View> */}

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            paddingTop: 30,
            paddingRight: 20,
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          Book's Name
        </Text>

        <TextInput
          style={styles.inputcontainer2}
          placeholder={"Enter the Book's Name"}
          value={Book}
          onChangeText={(Book) => setBook(Book)}

             />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            paddingTop: 30,
            paddingRight: 17,
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          Author's Name
        </Text>

        <TextInput
          style={styles.inputcontainer3}
          placeholder={"Enter the Author's Name"}
          value={Author}
          onChangeText={(Author) => setAuthor(Author)}
        />
      </View>


      <Button title="Add Data" onPress={getData} />
      <Button title="Read Data" onPress={fetchingdata} />
      


          {/* Main FLat LIst for the Firestore Firebase ⬇️ */}
          <FlatList 
          data={posts}
          renderItem={({item}) => (
            <View style={{paddingVertical:10,paddingLeft:40,justifyContent:'center', borderBottomColor: 'black',
            borderBottomWidth:2 }}>
              {/* <Text style={styles.name}>Name: {item.Name}</Text> */}
              <Text style={styles.name}>Book: {item.Book}</Text>
              <Text style={styles.name}>Author: {item.Author}</Text>
            </View>
          )}/>

        




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "",
    justifyContent: "center",
  },
  inputcontainer1: {
    borderWidth: 2,
    padding: 15,
    fontSize: 20,
    margin: 10,
    justifyContent: "center",
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 40,
    paddingLeft: 20,
    paddingRight: 36,
  },
  inputcontainer2: {
    borderWidth: 2,
    padding: 15,
    fontSize: 20,
    margin: 10,
    justifyContent: "center",
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 40,
    paddingLeft: 20,
    paddingRight: 32,
  },
  inputcontainer3: {
    borderWidth: 2,
    padding: 15,
    fontSize: 20,
    margin: 10,
    justifyContent: "center",
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 40,
    paddingLeft: 20,
    paddingRight: 12,
  },
  flatstyle: {
    padding: 16,
    marginTop: 20,
    borderStyle: "dashed",
    borderColor: "#1E5162",
    borderWidth: 4,
    borderRadius: 20,
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "bold",
    width: 190,
  },
  name:{
    fontSize:17,
    fontStyle:'italic'
  },
  book:{
    paddingRight:80
  }
});
