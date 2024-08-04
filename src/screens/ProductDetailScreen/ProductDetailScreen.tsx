import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import {RouteProp, useRoute, NavigationProp, useNavigation} from '@react-navigation/native';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import styles from './styles';

interface ProductDetailRouteParams {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
}

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{params: ProductDetailRouteParams}, 'params'>>();
  const {product} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.price}>${product.price}</Text>
      <AnimatedText style={styles.title} description={product.title} />
      <AnimatedText style={styles.description} description={product.description} />
      <Button
        title="Place Order"
        onPress={() => navigation.navigate('OrderForm')}
      />
    </View>
  );
};

export default ProductDetailScreen;
