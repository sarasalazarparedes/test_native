import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import StockGraph from '../components/StockGraph';
import { useStockContext } from '../StockContext';
import { LinearGradient } from 'expo-linear-gradient';

type GraphScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Graph'>;

interface GraphScreenProps {
  navigation: GraphScreenNavigationProp;
}

const GraphScreen: React.FC<GraphScreenProps> = () => {
  const { stocks } = useStockContext();
  const [scaleAnim] = React.useState(new Animated.Value(0.5));

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={['#4a69bd', '#6a89cc']} style={styles.container}>
      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        {stocks.length > 0 ? (
          <StockGraph stockData={stocks} />
        ) : (
          <Text style={styles.noDataText}>No stocks in watchlist. Add some stocks to see the graph.</Text>
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default GraphScreen;