import { ApolloClient, InMemoryCache,createHttpLink } from '@apollo/client';
import { FlatList, View, StyleSheet,Image } from 'react-native';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';


const { apolloUrl } = Constants.expoConfig.extra;
const {  AUTHEN_TOKEN } = Constants.expoConfig.login;


const httpLink = createHttpLink({
  uri: apolloUrl,
});


const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      
      const accessToken = await authStorage.getRecord(AUTHEN_TOKEN);
      //console.log(accessToken);
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log('Appollo Client Error:',e);
      return {
        headers,
      };
    }
  });
  console.log('url',apolloUrl);
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};


export default createApolloClient;