import react, { useState,useEffect,Component} from "react";
import { SafeAreaView,Text,View,FlatList,Button,StyleSheet,TextInput } from "react-native";
import { db } from "../config";
import { doc, setDoc, addDoc, collection, getDocs, query } from "firebase/firestore";
import { async } from "@firebase/util";
import firebase from 'firebase/app';
import { useFonts } from 'expo-font';
import { Table,Row,Rows,TableWrapper} from 'react-native-table-component'
import { Feather } from '@expo/vector-icons'; 



export default function Report()  {




    const [material,setmaterial]=useState([])

    const [MasterData, setMasterData] = useState([])

    


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
    const reportdata = await getDocs(collection(db,"Users TEst"))
    setmaterial(reportdata.docs.map((doc)=> ({...doc.data(),id:doc.id})));
    setMasterData(reportdata.docs.map((doc)=> ({...doc.data(),id:doc.id})));
    console.log(material);

  }
  infofetch();
},[])


const [Search, setSearch] = useState('')

const searchFilter = (text) => {
  if (text) {
    const newdata = MasterData.filter((item) => {
      const itemdata = item.Book ? item.Book.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemdata.indexOf(textData) > -1;
        });
      setmaterial(newdata) 
      setSearch(text);

  } else {
    setmaterial(MasterData);
    setSearch(text);
  }
}


    return(
        <SafeAreaView>

          <View style={{flexDirection:'row'}}>

            <Feather
             name="search"
             size={31}
             style={{paddingTop:15}} />            
            
            <TextInput
            style={styles.texinput}
            placeholder="Enter Book's Name"
            value={Search}
            onChangeText={(text) => searchFilter(text)}
           />
          </View>



      <View style={styles.body} >  
      <View style={styles.headwrapper}>

             <Text style={{flex:1,fontSize:20,fontWeight:'bold',fontStyle:'italic'}}> Name</Text>
              <Text  style={{flex:1,fontSize:20,fontWeight:'bold',fontStyle:'italic'}}> Book</Text>
              <Text style={{flex:1,fontSize:20,fontWeight:'bold',fontStyle:'italic'}}> Author</Text>
              
            </View>        
          <FlatList
          data={material}
          renderItem={({item}) =>(
            <View style={styles.listwrapper}>

             <Text style={styles.row}> {item.Name}</Text>
              <Text style={styles.row}> {item.Book}</Text>
              <Text style={styles.row}>{item.Author}</Text>
              
            </View>
            
          ) }

         />
      </View>



{/* //took me 3hrs just for ONE LINE */}
<View style={styles.count}>
<Text style={{fontSize:40,fontWeight:'bold'}} >{material.length}</Text>
<Text style={{fontSize:15}}> Data Entry</Text>
</View>


   </SafeAreaView>
    )
}

const styles= StyleSheet.create({
  name:{
    fontSize:17,
    fontStyle:'italic'
  },

  count:{
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:80
  },

  listwrapper:{
    flexDirection:'row',
    //so that that the text doesnt go off screen⬇️
    flexWrap:'wrap',
  borderBottomWidth:.5
  },

  headwrapper:{
    flexDirection:'row',
    //so that that the text doesnt go off screen⬇️
    flexWrap:'wrap',
  borderBottomWidth:.5,
  paddingTop:40

  },



  
  row:{
    flex:1,
    paddingHorizontal:5,
    fontSize:12,paddingVertical:5,
    fontWeight:'600',
    
  },
  head:{
    fontWeight:'bold',
    flex:1,
    paddingHorizontal:5,
    fontSize:12,
    paddingVertical:5
  },
  texinput:{
    fontSize:20,
    borderBottomColor:'black',
    // borderWidth:2,
    paddingVertical:12,
    margin:7,
    paddingRight:170,
    flex:1,
    borderBottomWidth:2,
    paddingBottom:2
  }

})