import { gql, useMutation } from '@apollo/client'
import { POST_AUTHENTICATE } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

//import { useAuth } from '../contexts/AuthContext';

import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';

const {  AUTHEN_TOKEN,  USER_NAME } = Constants.expoConfig.login;



const useSignIn = (triggerReset) => {
    
    const authStorage = new useAuthStorage();
    const apolloClient= new useApolloClient();
   // const { triggerReset } = useAuth();

 
    //const [authenticate, result] = useMutation(POST_AUTHENTICATE);
    const [authenticate, result] = useMutation(POST_AUTHENTICATE,{
      onSuccess: (data) => {
        //console.log(data)
      },
      onError:async (error) => {
        //console.log('Captured error',error.message)
        await authStorage.removeRecord(AUTHEN_TOKEN);
        await authStorage.removeRecord(USER_NAME);
        await apolloClient.resetStore();
        triggerReset(); 
      },
      onCompleted: async (data) => {
        
        let username =data.authenticate.user.username;
        let token =`${data.authenticate.accessToken}`
        
        await authStorage.setRecord(AUTHEN_TOKEN,token);
        await authStorage.setRecord(USER_NAME,username);  
        await apolloClient.resetStore();
        
        triggerReset(); 
      }
    } );
    
    const signIn = async ({ username, password }) => {
        

        const resultvalues= await authenticate({  variables: {  "credentials": {
            "username": username,
            "password": password
          }} });
          
       
          return resultvalues;
    };

    return [signIn, result];
  };

  export default useSignIn;


  /**
   * Retrieves the user's access token from the authentication storage.
   *
   * @returns {Promise<string>} - A promise that resolves to the user's access token.
   *
   * @example
   * const accessToken = await getUser();
   * console.log(accessToken); // Output: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   */
  export const  GetUser =  () => {
    
    
    
      console.log('Getting user1');
      const val =async ()=>{
        const userStorage1 = await useAuthStorage("auth","user");
        console.log('Getting user2');
        const accessToken = await userStorage1.getAccessToken();
        console.log('From userSignIn',accessToken);
        return accessToken;
      }
     // return val();
      //return val();
    return val;
    
  };