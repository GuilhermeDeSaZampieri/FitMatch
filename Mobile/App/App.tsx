import React from 'react';
import Toast from 'react-native-toast-message';
import AppRoutes from './src/routes/AppRoutes';
import {StatusBar} from 'react-native';
import {AppStateProvider} from './src/context/App';

function App() {
  return (
    <>
      <AppStateProvider>
        <StatusBar barStyle={'dark-content'} />
        <AppRoutes />
        <Toast autoHide />
      </AppStateProvider>
    </>
  );
}
export default App;
