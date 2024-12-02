/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './components/HomePage/Page/Home';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
