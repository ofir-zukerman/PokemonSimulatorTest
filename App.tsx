import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { store } from './src/redux_store/store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import Routes from './src/routes/routes';

if (__DEV__) {
  import('./src/utils/reactotronConfig').then(() => console.log('Reactotron is available'))
}

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Provider {...{ store }}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1 },
});

export default App;
