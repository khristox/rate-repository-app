import { StatusBar } from 'expo-status-bar';

import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';


import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

import { AuthProvider } from './src/contexts/AuthContext';


import Constants from 'expo-constants';


const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

import { PaperProvider } from 'react-native-paper';


const App = () => {
  //console.log(Constants.expoConfig);
  //console.log(Constants.expoConfig.extra.apolloUrl)


  return (

    <>
      <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
     
          <AuthProvider>

              <PaperProvider>

              <Main />
            </ PaperProvider>
    
          </AuthProvider>
        
        </AuthStorageContext.Provider>

      </ApolloProvider>
  
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;