import { Alert } from 'react-native';

export default {
  alert: async (title, message, alertBtnArray) => {
    let newAlertBtnArray = alertBtnArray;
    if (!newAlertBtnArray) {
      newAlertBtnArray = [{ text: 'OK', onPress: () => {}, style: 'cancel' }];
    }
    return new Promise((resolve) => {
      Alert.alert(
        title,
        message,
        newAlertBtnArray.map((btn) => ({
          ...btn,
          onPress: () => {
            if (btn.onPress) btn.onPress();
            resolve(btn.text);
          }
        }))
      );
    });
  }
};
