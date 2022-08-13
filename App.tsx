/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import RouteAapp from './src/routes';
// Color Switch Component

const App = () => {
  useEffect(() => {
    // enableLatestRenderer();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <RouteAapp />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
