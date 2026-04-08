import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ducha_data';

export interface DuchaData {
  litros: number;
  caudal: number;
  fecha: string;
}

export const saveDuchaData = async (data: DuchaData) => {
  try {
    const existingData = await getHistory();
    const newHistory = [...existingData, data];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const getHistory = async (): Promise<DuchaData[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    return [];
  }
};

export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing data", error);
  }
};