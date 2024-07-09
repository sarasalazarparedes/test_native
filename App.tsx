import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import AlertScreen from './screens/AlertScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import GraphScreen from './screens/GraphScreen';
import { StockProvider } from './StockContext';
import Toast from 'react-native-toast-message';

export type RootStackParamList = {
  Alert: undefined;
  Watchlist: undefined;
  Graph: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <StockProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="Alert"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4a69bd',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Alert" component={AlertScreen} options={{ title: 'Set Alert' }} />
          <Stack.Screen name="Watchlist" component={WatchlistScreen} options={{ title: 'Watchlist' }} />
          <Stack.Screen name="Graph" component={GraphScreen} options={{ title: 'Stock Graph' }} />
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
    </StockProvider>
  );
};

export default App;