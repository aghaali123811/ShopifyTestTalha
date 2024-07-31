import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import ImagePath from '../../common/ImagePath';
import Header from '../../components/Headers/Header';
import BackButton from '../../components/Buttons/BackButton';
import Input from '../../components/TextInput/Input';
import Button from '../../components/Buttons/Button';
import APIService from '../../network/APIService';
import Loader from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Strings from '../../common/Strings';
import {dismissKeyboard} from '../../common/Constants';

function LoginScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    try {
      const response = await APIService.login(email, password);
      if (response && response?.user) {
        dispatch(login(response));
        const jsonValue = JSON.stringify(response?.user);
        await AsyncStorage.setItem('user', jsonValue);
        await AsyncStorage.setItem('token', response?.token);
        // navigation.replace('HomeScreen', {
        //   user: response?.user,
        //   token: response?.token,
        // });
      }
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message || 'Something went wrong');
      console.error(error.response.data);
    }
  };
  const validationButton = () => {
    if (email === '' && email.length < 5) {
      alert(Strings.addCorrectEmail);
    } else if (password === '' && password.length < 5) {
      alert(Strings.addCorrectPassword);
    } else {
      setLoading(true);
      handleLogin();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.padding}>
          <Text allowFontScaling={false} style={styles.login}>
            {Strings.login}
          </Text>

          <Text allowFontScaling={false} style={styles.letStarted}>
            {Strings.letsGetStarted}
          </Text>

          <Text allowFontScaling={false} style={styles.error}>
            {error}
          </Text>
          <Input
            icon={ImagePath.email}
            value={email}
            placeholder={Strings.email}
            onChangeText={_ => setEmail(_)}
          />
          <Input
            icon={ImagePath.lock}
            value={password}
            placeholder={Strings.password}
            secureTextEntry={true}
            onChangeText={_ => setPassword(_)}
          />
          <TouchableOpacity
            style={styles.forgetPasswordBtn}
            onPress={() => navigation.navigate('ForgetPasswordScreen')}>
            <Text allowFontScaling={false} style={styles.forgetPassword}>
              {Strings.forgotPassword}
            </Text>
          </TouchableOpacity>
          <Button
            btnTitle={Strings.login}
            onPress={() => validationButton()}
            containerStyle={{marginTop: 30}}
          />
          <Text style={styles.noAccount} allowFontScaling={false}>
            {Strings.doNothaveAccount}
            <Text
              allowFontScaling={false}
              style={styles.signUp}
              onPress={() => navigation.navigate('SignUpScreen')}>
              {Strings.signup}
            </Text>
          </Text>
        </View>
        <Text style={styles.terms}>{Strings.privacyPolicyText}</Text>
        {loading && <Loader />}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
