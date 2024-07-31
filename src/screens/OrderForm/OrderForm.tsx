import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Alert,
} from 'react-native';
import styles from '../UserProfile/styles';
import Header from '../../components/Headers/Header';
import Input from '../../components/TextInput/Input';
import Button from '../../components/Buttons/Button';
import Loader from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {dismissKeyboard} from '../../common/Constants';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

function OrderForm(props: any) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState({image: null, video: null, audio: null});

  const handleOrderSubmit = async () => {
    setError('');
    // try {
    //   const order = {
    //     productName,
    //     description,
    //     quantity,
    //     media,
    //   };
    //   // Replace with your API service
    //   const response = await APIService.submitOrder(order);
    //   if (response) {
    //     Alert.alert('Order submitted successfully');
    //     // Store order in AsyncStorage if needed
    //     const jsonValue = JSON.stringify(order);
    //     await AsyncStorage.setItem('order', jsonValue);
    //   }
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   setError(error?.response?.data?.message || 'Something went wrong');
    //   console.error(error.response.data);
    // }
  };

  const validationButton = () => {
    if (productName === '') {
      alert('Please enter the product name');
    } else if (description === '') {
      alert('Please enter the description');
    } else if (quantity === '' || isNaN(quantity)) {
      alert('Please enter a valid quantity');
    } else {
      setLoading(true);
      handleOrderSubmit();
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets) {
      // setMedia({...media, image: result.assets[0].uri});
      const uri = result.assets[0].uri;
      setMedia({...media, image: uri});

      // Convert the image URI to a Blob
      const blob = await convertUriToBlob(uri);
      console.log('Image Blob:', blob);
    }
  };
  const convertUriToBlob = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'video',
    });

    if (result.assets) {
      setMedia({...media, video: result.assets[0].uri});
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      if (result) {
        setMedia({...media, audio: result[0].uri});
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
          <Text allowFontScaling={false} style={styles.error}>
            {error}
          </Text>
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
              <Image source={{uri: media.image}} style={styles.mediaPreview} />
            )}
            <Button btnTitle="Upload Video" onPress={pickVideo} />
            {media.video && <Text style={styles.mediaFile}>{media.video}</Text>}
            <Button btnTitle="Upload Audio" onPress={pickAudio} />
            {media.audio && <Text style={styles.mediaFile}>{media.audio}</Text>}
          </View>
          <Button
            btnTitle="Submit Order"
            onPress={validationButton}
            containerStyle={{marginTop: 30}}
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

export default OrderForm;
