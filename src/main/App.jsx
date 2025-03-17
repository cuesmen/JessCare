import React from 'react';
import AppRoutes from './AppRoutes';
import { LoaderProvider } from './LoaderContext';
import Loader from '../components/loader';

function App() {
  return (
    <LoaderProvider>
      <Loader />
      <AppRoutes />
    </LoaderProvider>
  );
}

export default App;
