
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from 'redux-persist';


interface ASStorage extends Storage {
  getAllKeys: () => Promise<readonly string[]>;
  clearAll: () => Promise<void>;
}

export const reduxStorage: ASStorage = {
  setItem: (key, value) => {
    return AsyncStorage.setItem(key, value);
  },
  getItem: (key) => {
    return AsyncStorage.getItem(key);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
  getAllKeys: () => {
    return AsyncStorage.getAllKeys();
  },
  clearAll: () => {
    return AsyncStorage.clear();
  }
};