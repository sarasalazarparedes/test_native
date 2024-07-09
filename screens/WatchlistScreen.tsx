import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import Watchlist from '../components/Watchlist';
import { useStockContext } from '../StockContext';
import { LinearGradient } from 'expo-linear-gradient';

type WatchlistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Watchlist'>;

interface WatchlistScreenProps {
  navigation: WatchlistScreenNavigationProp;
}

const API_KEY = 'cq67fn1r01qlbj4vu0p0cq67fn1r01qlbj4vu0pg';

const WatchlistScreen: React.FC<WatchlistScreenProps> = ({ navigation }) => {
  const { stocks, updateStocks, removeStock } = useStockContext();
  const [fadeAnim] = React.useState(new Animated.Value(0));

  useEffect(() => {
    const fetchStockData = async () => {
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
              ...stock,
              value: data.c,
              change: data.dp,
            };
          } catch (error) {
            console.error('Error fetching stock data:', error);
            return stock;
          }
        })
      );
      updateStocks(updatedStocks);
    };

    const debouncedFetchStockData = debounce(fetchStockData, 10000);

    debouncedFetchStockData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [stocks]);
 

  return (
    <LinearGradient colors={['#4a69bd', '#6a89cc']} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Watchlist stocks={stocks}  />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Graph')}
        >
          <Text style={styles.buttonText}>View Graph</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#f1c40f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WatchlistScreen;

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
