import { FlatList, View, StyleSheet,Alert} from 'react-native';
import Text from '../Text';
import {getReviews} from '../../hooks/useRepositories';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


const styles = StyleSheet.create({
  containerRow:{
    flexDirection: 'row',
    flex: 1,
    padding: 1,
  },
  containerColumn:{
    flexDirection: 'column',
    flex: 1,
    padding: 1,
  },
  view:{
    padding: 10,
    background20Color: '#dd3b3b',
    marginVertical: 3,
    marginHorizontal: 11,
    backgroundColor: '#ffffff',
  },
  separator: {
    height: 4,
    backgroundColor: '#fdfdfd',
    border:'1px solid black'
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'blue',
    borderStyle: 'solid',
    justifyContent: 'center',
    fontSize: 20,textAlign: 'center',
  
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
 
    color:`blue`,
    margin:'auto'
  },
  textUser: {
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle:'normal',
    color:`black`,
   
  },
  textDate: {
    fontWeight: '500',
    fontSize: 15,
    color:`grey`,
   
  }
});
  const RepositoryInfo = ({ repository }) => {
    // Repository's information implemented in the previous exercise
  };
  const ItemSeparator = () => <View style={styles.separator} />;

  const ReviewItem = ({ review }) => {
    return( 
      <>
       <View style={styles.containerRow} >
          <View style={styles.view}>
            <View style={styles.circle}>
              <Text style={styles.title}>{review.rating}</Text>
            </View>
          </View>  
          <View style={{flex: 2, backgroundColor: '#fff'}}>
            <View style={styles.containerColumn} >
              <View><Text style={styles.textUser}>{review.user.username}</Text></View>
              <View><Text style={styles.textDate} >{format(review.createdAt,"dd MMM yyyy")}</Text></View>
              <View><Text >{review.text}</Text></View>
            </View>
          </View>
        </View>
      </>
      );

  };
  
  const SingleRepository = ({id}) => {
    // ...
    
    const { data,  error,loading } = getReviews(id);
    (data) ?console.log('Details:',data):"";
    
    
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <ReviewItem review={item} />}
       // keyExtractor={({ id }) => id}
       // ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        // ...
      />
    );
  };
  
  export default SingleRepository;