import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing session data
export const  storeSessionData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing session data:', error);
  }
};

// Retrieving session data
export const  getSessionData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error retrieving session data:', error);
  }
};