import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  image: {
    height: 120,
    width: '100%'
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain'
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  closeButtonStyle: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF111133',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 100
  }
});
