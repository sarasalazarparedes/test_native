import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';

interface AlertFormProps {
  onSubmit: (symbol: string, alertPrice: number) => void;
}

const AlertForm: React.FC<AlertFormProps> = ({ onSubmit }) => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [priceAlert, setPriceAlert] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const stockOptions = [
    { label: 'AAPL', value: 'AAPL' },
    { label: 'GOOGL', value: 'GOOGL' },
    { label: 'MSFT', value: 'MSFT' },
    { label: 'AMZN', value: 'AMZN' },
  ];

  const handleSubmit = () => {
    if (stockSymbol && priceAlert) {
      onSubmit(stockSymbol, parseFloat(priceAlert));
      setStockSymbol('');
      setPriceAlert('');
    }
  };

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      onPress={() => {
        setStockSymbol(item.value);
        setModalVisible(false);
      }}
      style={styles.pickerItem}
    >
      <Text style={styles.pickerItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.comboBox}
      >
        <Text style={styles.comboBoxText}>
          {stockSymbol ? stockSymbol : 'Select a stock'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <FlatList
                  data={stockOptions}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.value}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Price Alert"
        placeholderTextColor="#a0a0a0"
        value={priceAlert}
        onChangeText={setPriceAlert}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Set Alert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  comboBox: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    marginBottom: 10,
  },
  comboBoxText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  pickerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerItemText: {
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#f1c40f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AlertForm;
