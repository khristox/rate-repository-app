import { FlatList, View, StyleSheet,Image} from 'react-native';
import Text from '../Text';





const onPressFunction = (data,navigation) =>{
 
  navigation.navigate('Details');
  
};

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


const ItemSeparator = () => <View style={styles.separator} />;



const kFormatter =(num) =>{
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const Items = props => {
    const { title ,values,growV} = props;
    return <>
        <View style={{  flexGrow: growV , alignItems: "center"}}>
            <Text style={styles.titleD}>{kFormatter(values)}</Text>
            <Text style={styles.titleE}>{title}</Text>
        </View>
    </>;
  }

export const Item = ({data}) => { 

    
    return(
 
      <View style={styles.view}>
      <View style={styles.flexContainer}>
        <View style={styles.flexItemA}>
          <Image source={{uri: data.ownerAvatarUrl}} style={{width: 80,height:60,alignSelf: 'baseline'}} />
        </View>
        <ItemSeparator/>
        <View style={styles.flexItemB}>
          <View style="{{width:24, paddingBotom:9}}">
              <Text style={styles.titleA}>{data.fullName}</Text>
              <Text style={styles.titleB}>{data.description}</Text>
              <Text style={styles.titleC}>{data.language}</Text>
          </View>

          
      
        </View>
      </View>
      <View style={[styles.flexContainer,{padding:4}]} >
              <Items title='Stars' values={data.stargazersCount} growV={1}  />
              <Items title='Forks' values={data.forksCount } growV={1}  />
              <Items title='Reviews' values={data.reviewCount} growV={1}  />
              <Items title='Ratings' values={data.ratingAverage} growV={1} />
          </View>
      </View>
     
    );
}
  