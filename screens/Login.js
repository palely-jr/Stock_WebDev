import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";



 
export default function Login({ navigation }) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function reverttoregister()  {
  navigation.navigate("Signup");
}

  function onclick()  {
  let userAuth  ;
    const credentials={
      username,
      password
    }
    
    
    fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
   })
   .then(data => data.json())
   .then(function(data) {
      userAuth = data;
       console.log(userAuth)
       if(userAuth.message){
        alert("Invalid Username and password");
       }else{
        if(userAuth[0].username){
            navigation.navigate("Stock");
        }
    }
   })
  }
 
  return (
    <View style={styles.container}>
      <form>
      <TouchableOpacity >
            <Button title="Sign in to Stock App"/>
      </TouchableOpacity>
      <br></br>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Please Enter Username"
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

      <TouchableOpacity>
            <Button title="Login" onPress={() => onclick()} />
      </TouchableOpacity>

<br></br>

      <TouchableOpacity >
            <Button title="SignUp" onPress={() => reverttoregister()} />
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
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  button: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },



});