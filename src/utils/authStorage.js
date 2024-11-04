import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth',itemName="accessToken") {
    this.namespace = namespace;
    this.itemName = itemName;
  }
  setState(namespace,itemName) {
    this.namespace = namespace;
    this.itemName = itemName;
  }
   async getAccessToken() {
    // Get the access token for the storage
    let rawAccesstoken = await AsyncStorage.getItem(
        `${this.namespace}:${this.itemName}`,
      );
    return rawAccesstoken ? (rawAccesstoken) : "";
  }
  
  async getRecord(itemName) {
    // Get the access token for the storage
    let rawAccesstoken = await AsyncStorage.getItem(
        `${itemName}`,
      );
    return rawAccesstoken ? (rawAccesstoken) : "";
  }
  async setRecord(itemName,itemValue) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${itemName}`,
      itemValue,
    );
  
  } 

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${this.namespace}:${this.itemName}`,
      accessToken,
    );
    //console.log(`${this.namespace}:${this.itemName}:`,accessToken);
  } 

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:${this.itemName}`);

  }
  async removeRecord(itemRemove) {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(itemRemove);

  }
  
}

export default AuthStorage;