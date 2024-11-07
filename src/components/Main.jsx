import { StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryItem';
import ReviewForm from './RepositoryItem/ReviewForm';
import AppBar from './AppBar';
import theme from '../thmes/themes';
import SignIn from './SignIn';
import SignOut from './Signout';
import Signup from './Signup';
import BodyMassIndexCalculator from './Bodymass';
import HomeScreen from './test/HomeScreen';

import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {

  const client = useApolloClient();

  const handleResetStore = async () => {
    try {
      await client.resetStore();
      // Optionally, you can trigger any state updates or refetch queries if needed
      console.error("Client Reset:");
    } catch (error) {
      console.error("Error resetting store:", error);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        {/* <Route path="/" element={<CreateReview />} /> */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/createReview"  element={<ReviewForm  key={Date.now()}/>} />

        <Route path="/massindex" element={<HomeScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signOut" element={<SignOut />} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </View>
  );
};

export default Main;