// AuthContext.js

import React, { createContext, useContext, useState,useEffect } from 'react';
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';

import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';


const AuthContext = createContext();

const {  AUTHEN_TOKEN,USER_NAME } = Constants.expoConfig.login;

  
 

export const AuthProvider = ({ children }) => {
    const authStorage = new useAuthStorage();
    const apolloClient= new useApolloClient();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [reset, setReset] = useState(false);

  
  
  const signIn = () => {
    
    return useSignIn(triggerReset);
  };

  const signOut =  () => {
   
    authStorage.removeRecord(AUTHEN_TOKEN);
    authStorage.removeRecord(AUTHEN_TOKEN);
    authStorage.removeRecord(USER_NAME);
    apolloClient.resetStore();
    triggerReset();  // Navigate to the Details screen
    console.log('Signed out')
    navigate('/signin'); 
  };

  const triggerReset = () => {
    setReset(true);
    // Reset the state back to false after handling
    setTimeout(() => setReset(false), 0); // You can adjust this timeout as needed
  };

  

  return (
    <AuthContext.Provider value={{ user, signIn, signOut ,reset, triggerReset}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
 
  return useContext(AuthContext);
};
