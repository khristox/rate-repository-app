import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';


const HomeScreen = ({ navigation }) => {
  const navigate = useNavigate();

  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        //onPress={() => navigation.navigate('Details')}
        onPress={()=>navigate('/createReview', { itemId: 86 })}
      />
    </View>
  );
};

export default HomeScreen;
