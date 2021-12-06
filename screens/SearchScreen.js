import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  TextInput,
  VirtualizedList,
  SafeAreaView,
  StatusBar,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text } from "react-native";
import ChartScreen from "./ChartScreen";
import { Dimensions } from "react-native";
// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)
const { width, height } = Dimensions.get("window");

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [company_symbol, setCompanySymbol] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [state, setState] = useState(
    []
    /* FixMe: initial state here */
  );


  async function SaveCompany(credentials) {
    return fetch('http://localhost:3001/savesymbol', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
 

  // can put more code here
  const [value, onChangeText] = useState("");
  const searchSymbol = (txt) => {
    var output = data.filter((item) => {
      return item.symbol
        .toLowerCase()
        .includes(txt.nativeEvent.text.toLowerCase());
    });
    setState(output);
  };
  useEffect(() => {
    fetch(ServerURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setState(json);
      })
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);

  var idCounter = 0;

  const getItem = (data, index) => {
    idCounter++;
    var dataObj = data[index];
    return {
      name: `${dataObj.name}`,
      symbol: `${dataObj.symbol}`,
    };
  };
  const getItemCount = (data) => {
    return state === null ? 0 : state.length;
  };

  function SaveDBOnPress(e,x) {
    console.log("You clicked " + e);
    console.log("You clicked " + x);
    setCompanyName(x)
    setCompanySymbol(e)
    const token = SaveCompany({
        company_symbol,
        company_name
    });
    console.log(token.message)
   if(token.message){
    alert("Invalid Username and password combo");
   }else{
    alert("Company Added to Shortlist");
} 

  }
  function chart(e) {
    console.log(e);
    navigation.navigate("ChartScreen", { route: e });
  }

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard}>
      <View style={styles.container}>
        <Text>Enter name of the company</Text>
        <TextInput
          style={{
            height: 30,
            borderColor: "blue",
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 14,
            paddingLeft: 9,
          }}
          onChangeText={(text) => onChangeText(text)}
          onChange={(txt) => {
            searchSymbol(txt);
          }}
          value={value}
          placeholder="Enter Name of the Company"
        />
        <SafeAreaView style={styles.container}>
          <VirtualizedList
            data={state}
            initialNumToRender={4}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text style={styles.item} onPress={() => chart(item.symbol)}>
                     {item.name}
                    <Button
                      style={styles.button}
                      onPress={() => SaveDBOnPress(item.symbol,item.name)}
                      title="Add to Shortlist"
                    />
                  </Text>
                </View>
              );
            }}
            keyExtractor={({ symbol }, index) => symbol}
            getItemCount={getItemCount}
            getItem={getItem}

          />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  alignSelf: "flex-start",
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: "#FFFFFF",
    height: 100,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,

  },
  title: {
    fontSize: 20,
  },
  button: {
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 29,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    float: 'right',
    marginLeft: "auto",
  },
});