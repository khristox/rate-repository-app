import React, { useState }  from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity ,Modal,Pressable} from 'react-native';
import useSharedId from './useSharedState';
import {Picker} from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import { List } from 'react-native-paper';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer, width } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons/faCaretSquareDown'



 
const MyList = ({sharedState, setSharedState}) => {
    //const [selectedId, setSelectedId] = useSharedId();

    const [modalVisible, setModalVisible] = useState(false);
  

    const handleSelection = (id) => {
        
        
     
        if(sharedState === id)
          setSharedState(null)
        else
         setSharedState(id);

          
     }

  const data = [
    { id: '1', name: 'Latest Repositories' },
    { id: '2', name: 'Higest rated Repositories' },
    { id: '3', name: 'Lowest rated Repositories' },
  ];

  // Create a header component
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Select an Item ...</Text>
      </View>
    );
  };

  // Render each item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity

       // for single item
       onPress={() => handleSelection(item.id)}
       style={[styles.item,item.id === sharedState ? styles.selected : null]}


     >
        <Text>{item.name}</Text>
     </TouchableOpacity>
  );
  const Items=data.filter(item => item.id === sharedState);
  const itemV=Items.length>0 ? data.filter(item => item.id === sharedState)[0].name : 'No selection';
  
  return (
    <>
    
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
             <View style={styles.centeredView}>
            <View style={styles.modalView}>
         
          <FlatList 
            style={{padding:10, width:'100%' ,  borderWidth: 2,
            }}                                                                
            data={data}                                                                               
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader} // Add the header component here
          />
          </View></View>
    </Modal>
    
    <Pressable
          style={[styles.button, styles.buttonOpen,{height:60,width:'100%'}]}
          onPress={() => setModalVisible(true)}>
   
    <View style={{ flex:1, padding: 10, height:100,       backgroundColor: "#ffffff", justifyContent: 'center',
 alignItems: 'center', flexDirection: 'column',width:'100%' } }>
        <View style={{flex: 1,padding: 6, borderColor:'black', flexDirection: 'row',borderWidth:1,width:'90%'}} >
        <View style={[{flex: 4,width: '100%',paddingLeft: 10,flexDirection:'row'}]} >
          <Text style={[{fontWeight: 'bold',fontStyle: 'italic'},{flex:0}]}>Sorted By: </Text>
          <Text style={styles.textStyle}>{itemV}</Text>                                                                                                                                                                    
        </View>
        <View style={{flex: 0, backgroundColor: 'white',width:'1'}} >
          <FontAwesomeIcon icon={faCaretSquareDown} />
        </View>         
        </View>
      </View>
     
   </Pressable>  
   


    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'left',
    
  },
  headerText: {
    fontSize: 18,
    color:"grey"
    
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selected: {
    marginLeft: 12,
    fontSize: 20,
    color:'red',
    borderBottomColor: '#713',

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
        flexDirection: 'column',
    
    //                                        height: '40%',
  },
  modalView: {
    height: '50',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MyList;
