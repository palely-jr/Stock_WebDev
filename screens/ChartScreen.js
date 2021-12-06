import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text /* include other react-native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { LineChart } from "react-native-chart-kit";
import { DataTable } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)
export default function ChartScreen({ navigation, route }) {
  const [rowData, setRowData] = useState([]);
  const [data, setData] = useState([]);
  console.log(route.params.route);
  const symbol = route.params.route;
  console.log(navigation);

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/` +
        symbol +
        `?from=2021-03-12&to=2021-06-01&apikey=f84908d9032402250918ef3eafbe6562`
    )
      .then((response) => response.json())
      .then((datas1) =>
        datas1["historical"].map((company) => {
          return {
            date: company.date,
            open: company.open,
            close: company.close,
            high: company.high,
            low: company.low,
            volume: company.volume,
            //   name: company.name,
            //  sector: company.sector,
          };
        })
      )
      .then((companiesRow) => setRowData(companiesRow));
  }, [symbol]);

  console.log(rowData);
  let priceClose = [0];
  let dateClosed = [0];
  let priceOpen = [0];
  let priceHigh = [0];
  let priceLow = [0];
  let priceVol = [0];

  for (var i in rowData) {
    priceClose[i] = rowData[i].close;
    dateClosed[i] = rowData[i].date;
    priceOpen[i] = rowData[i].open;
    priceHigh[i] = rowData[i].high;
    priceLow[i] = rowData[i].low;
    priceVol[i] = rowData[i].volume;
  }



  console.log(dateClosed[0]);

  return (
    <View style={styles.container}>

      <LineChart

        data={{
          label: dateClosed,
          datasets: [
            {
              label: dateClosed,
              data: priceClose,
              fill: false,

              borderWidth: 2,
              lineTension: 0.5,
            },
          ],
        }}
        width={Dimensions.get("window").width} 
        height={220}
        yAxisLabel="$"

        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <DataTable>
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
      </DataTable>
    </View>
  );
}

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

//const Data
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
});