import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import NavigationRoot from './src/MainNavigation/Navigation';

import AsyncStorage from '@react-native-community/async-storage';

import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

const queryClient = new QueryClient();
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});
const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <NavigationRoot />
    </PersistQueryClientProvider>
  );
};

export default App;