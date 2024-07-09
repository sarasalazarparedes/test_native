import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StockData } from '../StockContext';


interface WatchlistProps {
  stocks: StockData[];
}

const Watchlist: React.FC<WatchlistProps> = ({ stocks}) => {
  const renderItem = ({ item }: { item: StockData }) => (
    <View style={styles.stockItem}>
      <View style={styles.stockInfo}>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
        <Text style={styles.stockValue}>${item.value?.toFixed(2) ?? 'N/A'}</Text>
        <Text style={[styles.stockChange, item.change >= 0 ? styles.positive : styles.negative]}>
          {item.change != null ? (item.change >= 0 ? '+' : '') + item.change.toFixed(2) + '%' : 'N/A'}
        </Text>
      </View>
      {item.alertPrice && (
        <Text style={styles.alertPrice}>Price Alert: ${item.alertPrice.toFixed(2)}</Text>
      )}
  
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <FlatList
        data={stocks}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 10,
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  stockValue: {
    fontSize: 16,
    color: '#fff',
  },
  stockChange: {
    fontSize: 14,
  },
  positive: {
    color: '#2ecc71',
  },
  negative: {
    color: '#e74c3c',
  },
  alertPrice: {
    fontSize: 14,
    color: '#2c3e50',
  },
  removeButton: {
    padding: 5,
  },
});

export default Watchlist;