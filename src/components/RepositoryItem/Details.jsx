import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet,ActivityIndicator  } from 'react-native';
import  Reviews  from './Reviews';

import { Item } from './RepositoryItem';
import {useRepository} from '../../hooks/useRepositories';
import * as Linking from 'expo-linking';



const DetailsScreen = ({ navigation,route }) => {
  console.log('DetailsScreen');
  const handlePress = (rec) => {
        //alert(rec.ownerAvatarUrl);
        Linking.openURL(rec.ownerAvatarUrl)
      };

      //let { userId } = useParams();
  const id = route.params;
  const { data,  error,loading } = useRepository(id);
  
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;
  
  return (
    <>
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Item data={data.repository}  />
      <Button
        title="Open in Git hub"
        style={styles.button}
        onPress={()=>handlePress(data.repository)}
        //onPress={() => navigation.goBack()} // Going back to the previous screen
      />
       <Button
        title="Create Review"
        style={styles.button}
        onPress={()=> navigation.navigate('Review')}
        //onPress={() => navigation.goBack()} // Going back to the previous screen
      />
      <Reviews id={id} />
      
      
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
      paddingHorizontal: 40,
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
