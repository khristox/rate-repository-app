import { FlatList, View, StyleSheet,Image,ActivityIndicator,Pressable, Alert } from 'react-native';
import Text from '../Text';
import useRepositories from '../../hooks/useRepositories';
import { Item } from './RepositoryItem';
import { NavigationContainer,createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  DetailsScreen  from './Details';
import ReviewForm from  './ReviewForm';
import RepoMenu from './RepoMenu';
import useSharedId from './useSharedState';
import React, { useState }  from 'react';



const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
  ,
  item: {
    backgroundColor: '#0E4C92',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 19,
    color:`#fff`
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 20,
     color:`#e8f8f5`,
     
  },
  titleA: {
    fontWeight: 'bold',
    fontSize: 20,
     color:`#021a15`,
     
  },
  titleB: {
    fontWeight: 'normal',
    fontSize: 14,
    color:`#424645`,
    fontStyle:`italic`,
    overflow:`visible`
  },
  titleC: {
    fontWeight: 'normal',
    fontSize: 14,
    
    fontStyle:`italic`,
    overflow:`visible`,
    backgroundColor:"#1e0783",
    flexShrink: 3,
    
    color:`#eaf5f2`,
    alignSelf: 'flex-start', 
    marginLeft: 0,
    marginBottom: 2,
    padding:6,
    paddingBottom:6,
    paddingTop:6,
    borderRadius:3

},
titleD: {
    fontWeight: 'bold',
    fontSize: 14,
    color:`#010c09`,
    
  },
  titleE: {
    fontWeight: 'bold',
    fontSize: 16,
    color:`#2a2e2d`,
    
  },
  view:{
    padding: 10,
    backgroundColor: '#e8eaee',
    marginVertical: 1,
    marginHorizontal: 11,
  },
  flexContainer: {
    display: 'flex',
    flexDirection:`row`,
    margin: 0,
    columnGap:10,
    backgroundColor:`#FFF`

  },
  flexItemA: {
    flexGrow: 0,
    backgroundColor: '#eef2f7',
    margin: 2
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: '#e6f0fa',
    textWrap:`wrap`,
    flexWarp:`wrap`,
   
    flexWrap:`wrap`,
    width:0
  },
});

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];


const ItemSeparator = () => <View style={styles.separator} />;


  
const RepositoryList = ({ navigation }) => {

  
  
  const [sharedState, setSharedState] = useState(0);
  
  const { data,  error,loading } = useRepositories(sharedState);
  
  const onPressFunction = (data) => {
    navigation.navigate('Details', data.id);

  };
    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;
  
//    console.log(sharedState);

  return (
    <>
         
         <RepoMenu sharedState={sharedState} setSharedState={setSharedState}/>
          <FlatList
            data={data}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <Pressable onPress={()=>onPressFunction(item)}><Item data={item} navigation={{ navigation }} /></Pressable>}
            keyExtractor={item => item.id}
          // other props
          />
         
    </>
  );
};



const Stack = createNativeStackNavigator();






const App = ({form}) => {
  
  return (
    
    <NavigationContainer  height='20' options={{height: 10}} >
    <Stack.Navigator initialRouteName={(form?form:"Home")} height="10" screenOptions={{
        headerMode: 'float',
        headerTintColor: 'white',
        height: 10,
        headerStyle: { backgroundColor: 'navy',height:10},
        headerTitleStyle: {
          fontWeight: 'bold',height:10
        }
      }} >
      <Stack.Screen  options={{headerShown: false}}   name="Home" component={RepositoryList} />
      <Stack.Screen  options={{height:10,width:20}}   path=":userId" name="Details" component={DetailsScreen} />
      <Stack.Screen  options={{height:10,width:20}} title="Create Reviews"  path=":reviewform" name="Review" component={ReviewForm} />

    </Stack.Navigator>
  </NavigationContainer>
  );
};
//export default RepositoryList;


export default App;


