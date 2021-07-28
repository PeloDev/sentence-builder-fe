import React from 'react';
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
