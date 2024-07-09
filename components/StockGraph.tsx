import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { StockData } from '../StockContext';

interface StockGraphProps {
  stockData: StockData[];
}

const StockGraph: React.FC<StockGraphProps> = ({ stockData }) => {
  const screenWidth = Dimensions.get('window').width;
  
  const data = {
    labels: stockData.map(stock => stock.symbol),
    datasets: [
      {
        data: stockData.map(stock => stock.value ?? 0),
        color: (opacity = 1) => `rgba(241, 196, 15, ${opacity})`, // yellow
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff', 
    backgroundGradientFrom: '#ffffff', 
    backgroundGradientTo: '#ffffff', 
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#f1c40f',
    },
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Values</Text>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default StockGraph;