import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Switch,
} from 'react-native';
import styles from './styles';
import ImagePath from '../../common/ImagePath';
import Input from '../../components/TextInput/Input';
import Button from '../../components/Buttons/Button';
import APIService from '../../network/APIService';
import Loader from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../common/Strings';
import { dismissKeyboard } from '../../common/Constants';
import { setTheme, setToken, loadState } from '../../toolkit/authSlice';
import { RootState } from '../../store';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.auth.theme);
  const [darkMode, setDarkMode] = useState<boolean>(theme === 'dark');

  useEffect(() => {
    const loadAuthState = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const theme = await AsyncStorage.getItem('theme');

      if (token && user) {
        dispatch(
          loadState({ token, user: JSON.parse(user), theme: theme || 'light' }),
        );
        navigation.replace('HomeScreen');
      }
    };

    loadAuthState();
  }, [dispatch, navigation]);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
        // dispatch(setToken({ token: response.token, user: response.user }));
        // const jsonValue = JSON.stringify(response.user);
        // await AsyncStorage.setItem('user', jsonValue);
        // await AsyncStorage.setItem('token', response.token);
        navigation.replace('Products');
    } catch (error) {
      setError(error|| 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const validationButton = () => {
    if (email === '' || email.length < 5) {
      alert(Strings.addCorrectEmail);
    } else if (password === '' || password.length < 5) {
      alert(Strings.addCorrectPassword);
    } else {
      handleLogin();
    }
  };

  const toggleDarkMode = async () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    dispatch(setTheme(newTheme));
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.padding}>
          <Text allowFontScaling={false} style={styles.header}>
            {Strings.login}
          </Text>
          <Text allowFontScaling={false} style={styles.letStarted}>
            {Strings.letsGetStarted}
          </Text>
          {error ? (
            <Text allowFontScaling={false} style={styles.error}>
              {error}
            </Text>
          ) : null}
          <Input
            icon={ImagePath.email}
            value={email}
            placeholder={Strings.email}
            onChangeText={setEmail}
          />
          <Input
            icon={ImagePath.lock}
            value={password}
            placeholder={Strings.password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button
            btnTitle={Strings.login}
            onPress={handleLogin}
            containerStyle={{ marginTop: 30 }}
          />
          <Text style={styles.noAccount} allowFontScaling={false}>
            {Strings.doNothaveAccount}
            <Text
              allowFontScaling={false}
              style={styles.signUp}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              {Strings.signup}
            </Text>
          </Text>
        </View>
        <View style={styles.themeContainer}>
          <Text>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
        <Text style={styles.terms}>{Strings.privacyPolicyText}</Text>
        {loading && <Loader />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
