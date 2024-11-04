// SignOut.js

import React from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView } from 'react-native';


import Constants from 'expo-constants';
import { useAuth } from '../contexts/AuthContext';


const {  AUTHEN_TOKEN,USER_NAME } = Constants.expoConfig.login;

const user="Chris";
const SignOut = () => {
    const  {signOut}  = useAuth(); 
    const goToDetails =  () =>  signOut();
    return (
      <View style={styles.container}>
        {user ? (
          <>
          <SafeAreaView style={{ flex: 0 }}>
                  <Text style={styles.welcomeText}>Welcome, !</Text>
                  <Button title="Sign Out"  onPress={goToDetails} />
            </SafeAreaView>
          </>
        ) : (
          <Text style={styles.message}>No user logged in.</Text>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SignOut;
