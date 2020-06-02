import { Alert } from 'react-native';

export default {
  alert: async (title, message, alertBtnArray) => {
    let newAlertBtnArray = alertBtnArray;
    if (!newAlertBtnArray) {
      newAlertBtnArray = [{ text: 'OK' }];
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

// // ||  Usage:
// // ||  const res = await AsyncAlert.alert(
// // ||    'Confirm logging out ?',
// // ||    'All unsaved data will be wiped.',
// // ||    [{ text: 'OK' }, { text: 'Cancel' }]
// // ||  );
// // ||  if (res === 'Cancel') {
// // ||    return;
// // ||  }
