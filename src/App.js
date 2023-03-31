import React from 'react';
import RootApp from './RootApp';
import store, {persistor} from './store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox} from 'react-native';
import {SSRProvider} from '@react-aria/ssr';
import {NativeBaseProvider} from 'native-base';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
  return (
    <>
      <SSRProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NativeBaseProvider>
              <RootApp />
            </NativeBaseProvider>
          </PersistGate>
        </Provider>
      </SSRProvider>
    </>
  );
};

export default App;
