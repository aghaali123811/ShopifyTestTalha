import {StyleSheet} from 'react-native';
import Colors from '../../common/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: '3%',
  },
  card: {
    width: '45%',
    minHeight: 200,
    margin: '3%',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priceContainer: {
    minWidth: 50,
    height: 22,
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.secondary,
    zIndex: 1000,
  },
  price: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'stretch',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
