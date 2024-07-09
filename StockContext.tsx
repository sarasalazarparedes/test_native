import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StockData {
  symbol: string;
  value: number;
  change: number;
  alertPrice?: number;
}

interface StockContextType {
  stocks: StockData[];
  addStock: (stock: StockData) => void;
  updateStocks: (updatedStocks: StockData[]) => void;
  removeStock: (symbol: string) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    loadStocksFromStorage();
  }, []);

  const loadStocksFromStorage = async () => {
    try {
      const storedStocks = await AsyncStorage.getItem('stocks');
      if (storedStocks) {
        setStocks(JSON.parse(storedStocks));
      }
    } catch (error) {
      console.error('Error loading stocks from storage:', error);
    }
  };

  const saveStocksToStorage = async (updatedStocks: StockData[]) => {
    try {
      await AsyncStorage.setItem('stocks', JSON.stringify(updatedStocks));
    } catch (error) {
      console.error('Error saving stocks to storage:', error);
    }
  };

  const addStock = (stock: StockData) => {
    setStocks((prevStocks) => {
      const existingStockIndex = prevStocks.findIndex((s) => s.symbol === stock.symbol);
      let updatedStocks;
      if (existingStockIndex !== -1) {
        updatedStocks = [...prevStocks];
        updatedStocks[existingStockIndex] = { ...updatedStocks[existingStockIndex], ...stock };
      } else {
        updatedStocks = [...prevStocks, stock];
      }
      saveStocksToStorage(updatedStocks);
      return updatedStocks;
    });
  };

  const updateStocks = (updatedStocks: StockData[]) => {
    setStocks(updatedStocks);
    saveStocksToStorage(updatedStocks);
  };

  const removeStock = (symbol: string) => {
    setStocks((prevStocks) => {
      const updatedStocks = prevStocks.filter((stock) => stock.symbol !== symbol);
      saveStocksToStorage(updatedStocks);
      return updatedStocks;
    });
  };

  return (
    <StockContext.Provider value={{ stocks, addStock, updateStocks, removeStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
};