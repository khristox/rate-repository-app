import { View, StyleSheet,Pressable,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../thmes/themes';
import { Link } from "react-router-native";
import { GET_ME } from '../graphql/queries';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';
import {  useEffect,useState } from 'react';
import {GetUser} from '../hooks/useSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStorage from '../hooks/useAuthStorage';
const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor:theme.colors.statusBar
    },
    flexContainer: {
      display: 'flex',
      flexDirection:`row`,
    }
  });

  const Component = (props) => {
   const {user}=props;
    
    return (
        user !==null  && user.length>0   ?
             <>
             <View>
                <Link to="/signout">
                <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Sign Out!</Text>
                </Link>
              </View>
              </> 
              :
              <>
              <View>
                <Link to="/signIn">
                <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Sign IN!</Text>
                </Link>
              </View>
              </>
    );
  };


  
  const USER_NAME="user.username";

  const AppBar = () => {
    const { reset } = useAuth();
    
    const authStorage = new useAuthStorage();
   
   const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
 
    useEffect(() => {
      //setLoading(true);
      const fetchItem = async () => {
        try {
          const storedItem = await authStorage.getRecord(USER_NAME); // Replace 'myKey' with your key
         // console.log('App Bar',USER_NAME,storedItem)
          if (storedItem !== null) {
             setUser(storedItem); // Store the retrieved item in state
          } 
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setLoading(false);
          //
          //console.log('App Bar',storedItem)
        }
      };
  
      fetchItem();
    }, [reset ]);

        return <View style={[styles.container,styles.flexContainer]}>
                  <ScrollView horizontal>

                      
                      <View>
                        <Link to="/">
                        <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Repositories</Text>
                        </Link>
                      </View>
                      <Component user={user}/>
                      <View>
                        <Link to="/signin">
                        <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Sign In!</Text>
                        </Link>
                      </View>
                      <View>
                        <Link to="/massindex">
                        <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Mass Index</Text>
                        </Link>
                      </View>
                  </ScrollView>
              </View>;
};

export default AppBar;