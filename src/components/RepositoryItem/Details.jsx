import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet  } from 'react-native';
import { Item } from './RepositoryItem';
import {useRepository} from '../../hooks/useRepositories';

const DetailsScreen = ({ navigation }) => {
    const handlePress = () => {
        alert('Button Pressed!');
      };
      const { data,  error,loading } = useRepository();
      console.log('Details',data,error);
      

  return (
    <>
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Item data={{}}  />
      <Button
        title="Go Back"
        style={styles.button}
        onPress={() => navigation.goBack()} // Going back to the previous screen
      />
      
    </View>
   
  </>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
     // justifyContent: 'center',
      //alignItems: 'center',
      padding: 6,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#5e4caf', // Green color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      elevation: 3, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
export default DetailsScreen;
