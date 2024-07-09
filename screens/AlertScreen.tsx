import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import AlertForm from '../components/AlertForm';
import { useStockContext } from '../StockContext';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';

type AlertScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Alert'>;

interface AlertScreenProps {
  navigation: AlertScreenNavigationProp;
}

const API_KEY = 'cq67fn1r01qlbj4vu0p0cq67fn1r01qlbj4vu0pg';

const AlertScreen: React.FC<AlertScreenProps> = ({ navigation }) => {
  const [bounceValue] = useState(new Animated.Value(1));
  const { addStock, stocks } = useStockContext();

  const onSubmit = async (symbol: string, alertPrice: number) => {
    try {
      const response =  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
      const data = await (await response).json();
      
      if (data.c != null && data.dp != null) {
        addStock({
          symbol,
          value: data.c,
          change: data.dp,
          alertPrice,
        });

        Toast.show({
          type: 'success',
          text1: 'Alert Set',
          text2: `Alert set for ${symbol} at price $${alertPrice}`,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
        });

        Animated.sequence([
          Animated.spring(bounceValue, { toValue: 1.2, useNativeDriver: true }),
          Animated.spring(bounceValue, { toValue: 1, useNativeDriver: true })
        ]).start();
      } else {
        throw new Error('Invalid data received from API');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      Alert.alert("Error", "Unable to set alert. Please try again.");
    }
  };

  const handleGoToWatchlist = () => {
    if (stocks.length === 0) {
      Alert.alert("No Data", "Your watchlist is empty. Add some stocks first!");
    } else {
      navigation.navigate('Watchlist');
    }
  };

  return (
    <LinearGradient colors={['#4a69bd', '#6a89cc']} style={styles.container}>
        <AlertForm onSubmit={onSubmit} />
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: bounceValue }] }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGoToWatchlist}
        >
          <Text style={styles.buttonText}>Go to Watchlist</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f1c40f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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

export default AlertScreen;