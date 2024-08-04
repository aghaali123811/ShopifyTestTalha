import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  padding: {
    padding: 16,
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
  forgetPasswordBtn: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgetPassword: {
    color: 'black',
  },
  noAccount: {
    marginTop: 10,
  },
  signUp: {
    color: 'blue',
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  terms: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles;
