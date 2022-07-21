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

export default function Home() {
  const Navigation = useNavigation();

  const [Person, setPerson] = useState('');

  const [data, setdata] = useState([]);

  function addUser() {
    addDoc(collection(db, "Carl"), {
      Name: Person,
    })
      .then(() => {
        console.log("Data Added Successfully", data);
        Alert.alert("Data Added Sucessfully");
        if (Person) setdata([...data, { Person: Person }]);
      })
      .catch((error) => {
        console.log("error");
      });
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row" }}>
        <Text style={Styles.text}> Name </Text>

        <TextInput
          value={String(Person)}
          style={Styles.input}
          placeholder="Enter the User's Name"
          onChangeText={(Person) => setPerson(Person)}
        />
      </View>

      <Button title="Add User" onPress={addUser} />

      <View>
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
});
