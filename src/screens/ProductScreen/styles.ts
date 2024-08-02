import {StyleSheet} from 'react-native';
import Colors from '../../common/Colors';

const styles = StyleSheet.create({
  container: {
    width: '45%',
    minHeight: 200,
    marginLeft: '3%',
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
  priceContainer: {
    minWidth: 50,
    height: 22,
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#9D9D9D',
    zIndex: 1000,
  },
  price: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 0,
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  productName: {
    color: '#000',
    marginTop: 2,
    marginBottom: 5,
    width: '96%',
    marginLeft: 15,
  },
  marginTop: {
    marginTop: 10,
  },
});

export default styles;