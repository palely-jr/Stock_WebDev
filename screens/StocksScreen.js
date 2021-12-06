import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text /* include other react-native components here as needed */,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)
async function DeleteCompany(credentials) {
  return fetch('http://localhost:3001/deleteCompany', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function StocksScreen({ route }) {
  //const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [data, rowData] = useState([]);
  const [company_symbol, setCompanySymbol] = useState("");
//   function deleteOnPress(e) {
//     console.log("You clicked " + e);
//     setCompanySymbol(e)
//     const token = DeleteCompany({
//         company_symbol
//     });
//     console.log(token.message)
//    if(token.message){
//     let userCheck=confirm("Company Deletion Sucessfull");
//     if (userCheck) {
//       window.location.reload(false);
//     }
//    }else{
//     let userCheck=confirm("Company Deletion Sucessfull");
//     if (userCheck) {
//       window.location.reload(false);
//     }
// } 

//   }
  // can put more code here

  useEffect(() => {
    fetch("http://localhost:3001/companylist")
      .then((response) => response.json())
      .then((json) => {
        rowData(json);
      })
      .catch((error) => alert(error))
      .finally(setLoading(false));
  },[]);

  for (var i = 0; i < data.length; i++) {
      state.push(data[i]);
  }



  return (
    <TouchableWithoutFeedback onPress={Keyboard}>
      <View style={styles.container}>
        <FlatList
          data={state}
          keyExtractor={({ symbol }, index) => symbol}
          renderItem={({ item }) => {
            return (
              <Text style={styles.item}>
                {item.company_symbol} {item.company_name}
                {/* <Button
                      style={styles.button}
                      onPress={() => deleteOnPress(item.company_symbol)}
                      title="Delete from Watchlist"
                    /> */}
              </Text>
            );
          }}
        />
        {/* <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text>Stock:{symbol} </Text>
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <Text>
            Date: {dateClosed[0]} | Volume: {priceVol[0]}
          </Text>
        </DataTable.Row>

        <DataTable.Row>
          <Text>
            Open: {priceOpen[0]} | Close: {priceClose[0]}
          </Text>
        </DataTable.Row>
        <DataTable.Row>
          <Text>
            High: {priceHigh[0]}| Low: {priceLow[0]}
          </Text>
        </DataTable.Row>
      </DataTable> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // FixMe: add styles here ...
  // use scaleSize(x) to adjust sizes for small/large screens
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "orange",
    color: "red",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "pink",
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
  },
});