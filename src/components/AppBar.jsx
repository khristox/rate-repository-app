import { View, StyleSheet,Pressable,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../thmes/themes';
import { Link ,useNavigation} from "react-router-native";

import { useAuth } from '../contexts/AuthContext';
import {  useEffect,useState } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';

import uuid from 'react-native-uuid';


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
              <View>
                <Link to="/signUp">
                <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Sign Up</Text>
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

         
    
    const onLinkClick = (e) => {
      //e.preventDefault();
    //  console.log(e);
     // history.push('/your-route');
   };
      function changeLocation(e){
       // this.props.navigation.state.routeName
        console.log('Location',e.props);
        /* const router = useRoute();

        router.push({ pathname: '/empty' });
        router.replace({ pathname: {placeToGo} });
        console.log(placeToGo); */
        

       // navigate(placeToGo, { replace: true });
       // window.location.reload();
      }

        return <View style={[styles.container,styles.flexContainer]}>
                  <ScrollView horizontal>

                      
                      <View>
                        <Link to="/">
                        <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Repositories</Text>
                        </Link>
                      </View>
                      <View>
                        <Link  reloadDocument to={{pathname: '/createReview', state: 'flushDeal',params:uuid.v4() }}  onPress={changeLocation}  >
                        <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Create Review</Text>
                        </Link>
                      </View>
                      <Component user={user}/>
                      
                      <View>
                        <Link to="/massindex">
                        <Text fontWeight="bold" fontSize="subheading" style={{ padding: 10 ,color: `#FFFFF0`}}>Mass Index</Text>
                        </Link>
                      </View>
                  </ScrollView>
              </View>;
};

export default AppBar;