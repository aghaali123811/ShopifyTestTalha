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

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

const ProductScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {data, isLoading, error} = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={'large'} />
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.centered}>
        <Text>Error fetching products</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
      </View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
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
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ProductScreen;
