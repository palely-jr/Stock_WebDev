import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";


async function registerUser(credentials) {



    return fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
 
export default function Register({ navigation }) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  function reverttologin() {

      navigation.navigate("Login");

  }



  function onclick() {

    const token = registerUser({
      username,
      password,
      name
  });
   if(token.message){
    alert("Invalid Username and password combo");
   }else{
    let userCheck=confirm("User Creation Successful");
    if (userCheck) {
      navigation.navigate("Login");
    }
} 
  }
 
  return (
    
    <View style={styles.container}>
 <form>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Please Enter Email"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setEmail(username)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
 
      <TouchableOpacity>
            <Button title="Signup" onPress={() => onclick()} />
      </TouchableOpacity>

<br></br>

      <TouchableOpacity >
            <Button title="Login" onPress={() => reverttologin()} />
      </TouchableOpacity>
      </form>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  loginBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFF",
  },
});