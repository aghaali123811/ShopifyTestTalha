import React, { useState } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Input from '../../components/TextInput/Input';
import Button from '../../components/Buttons/Button';
import Loader from '../../components/Loader/Loader';
import { dismissKeyboard } from '../../common/Constants';
import axios from 'axios';

const OrderForm = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<{ image: string | null, video: string | null, audio: string | null }>({ image: null, video: null, audio: null });

  const handleOrderSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const order = {
        productName,
        description,
        quantity,
        media,
      };
        // const response = await axios.post('https://fakestoreapi.com/orders', {
        //   product_id: product.id,
        //   productName,
        //   description,
        // });
      // const response = await APIService.submitOrder(order);
      // if (response) {
      Alert.alert('Order submitted successfully');
      // Store order in AsyncStorage if needed
      const jsonValue = JSON.stringify(order);
      await AsyncStorage.setItem('order', jsonValue);
      // }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validationButton = () => {
    if (!productName) {
      Alert.alert('Validation Error', 'Please enter the product name');
    } else if (!description) {
      Alert.alert('Validation Error', 'Please enter the description');
    } else if (!quantity || isNaN(Number(quantity))) {
      Alert.alert('Validation Error', 'Please enter a valid quantity');
    } else {
      handleOrderSubmit();
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
    if (result.assets) {
      const uri = result.assets[0].uri;
      setMedia((prev) => ({ ...prev, image: uri }));
      // Convert the image URI to a Blob
      const blob = await convertUriToBlob(uri);
      console.log('Image Blob:', blob);
    }
  };

  const convertUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibrary({ mediaType: 'video' });
    if (result.assets) {
      setMedia((prev) => ({ ...prev, video: result.assets[0].uri }));
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.pick({ type: [DocumentPicker.types.audio] });
      if (result) {
        setMedia((prev) => ({ ...prev, audio: result[0].uri }));
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.padding}>
          <Text allowFontScaling={false} style={styles.header}>
            Order Form
          </Text>
          {error ? <Text allowFontScaling={false} style={styles.error}>{error}</Text> : null}
          <Input
            value={productName}
            placeholder="Product Name"
            onChangeText={setProductName}
          />
          <Input
            value={description}
            placeholder="Description"
            onChangeText={setDescription}
          />
          <Input
            value={quantity}
            placeholder="Quantity"
            keyboardType="numeric"
            onChangeText={setQuantity}
          />
          <View style={styles.mediaButtons}>
            <Button btnTitle="Upload Image" onPress={pickImage} />
            {media.image && (
              <Image source={{ uri: media.image }} style={styles.mediaPreview} />
            )}
            <Button btnTitle="Upload Video" onPress={pickVideo} />
            {media.video && <Text style={styles.mediaFile}>{media.video}</Text>}
            <Button btnTitle="Upload Audio" onPress={pickAudio} />
            {media.audio && <Text style={styles.mediaFile}>{media.audio}</Text>}
          </View>
          <Button
            btnTitle="Submit Order"
            onPress={validationButton}
            containerStyle={{ marginTop: 30 }}
          />
        </View>
        <Text style={styles.terms}>
          By placing an order, you agree to our terms and conditions.
        </Text>
        {loading && <Loader />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  padding: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  mediaButtons: {
    marginTop: 20,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  mediaFile: {
    marginTop: 10,
  },
  terms: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default OrderForm;
