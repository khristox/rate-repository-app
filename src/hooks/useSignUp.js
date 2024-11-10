import { gql, useMutation } from '@apollo/client'
import { POST_SIGNUP } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

//import { useAuth } from '../contexts/AuthContext';

import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';

const {  AUTHEN_TOKEN,  USER_NAME } = Constants.expoConfig.login;



const useSignUp = (triggerReset) => {
    

 
    //const [authenticate, result] = useMutation(POST_AUTHENTICATE);
    const [createUser, result] = useMutation(POST_SIGNUP,{
      onSuccess: (data) => {
        //console.log(data)
      },
      onError:async (error) => {
      
      //  triggerReset(); 
      },
      onCompleted: async (data) => {
       
      }
    } );
    
    const signUp = async ({ username, password }) => {
        

        const resultvalues= await createUser({  variables: {  "user": {
            "username": username,
            "password": password
          }} });
          
       
          return resultvalues;
    };

    return [signUp, result];
  };

  export default useSignUp;

