import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import styles from './styles';

// Fetch products from a public API
const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductList = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {data, isLoading, error} = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error fetching products</Text>
      </View>
    );

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('ProductDetail', {product: item})}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <Image source={{uri: item.image}} style={styles.image} />
          <Text
            numberOfLines={1}
            style={[styles.productName, styles.marginTop]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ProductList;
