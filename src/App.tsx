import React from 'react';
import Header from './components/Header';
import { StateProvider } from './core/app-context';
import Routes from './core/routes';

function App() {
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
}

export default App;
