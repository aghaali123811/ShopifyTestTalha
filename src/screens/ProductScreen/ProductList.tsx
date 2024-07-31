import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async () => {
  const response = await axios.get('https://api.example.com/products');
  return response.data;
};

const ProductList = () => {
  // const {data, error, isLoading} = useQuery(['products'], fetchProducts);

  // if (isLoading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error loading products</Text>;

  return (
    <FlatList
      data={[
        {id: '1', name: 'Product 1'},
        {id: '2', name: 'Product 2'},
      ]}
      numColumns={2}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.container}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}> productPrice</Text>
          </View>
          <Image
            source={{
              uri: 'https://picsum.photos/seed/picsum/200/300',
            }}
            style={styles.image}
          />

          <Text
            numberOfLines={1}
            style={[styles.productName, styles.marginTop]}>
            {'brandDisplayName'}
          </Text>
          <Text numberOfLines={1} style={styles.productName}>
            {'productName'}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    minHeight: 200,
    marginLeft: '3%',
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#000',
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
    color: '#fff',
    marginTop: 2,
    marginBottom: 5,
    width: '96%',
    marginLeft: 15,
  },
  marginTop: {
    marginTop: 10,
  },
});
export default ProductList;
