// styles.ts
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  forgetPassword: {
    marginTop: 10,
    color: 'black',
  },
  noAccount: {
    marginTop: 10,
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
  mediaButtons: {
    marginTop: 10,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  mediaFile: {
    marginTop: 10,
  },
  terms: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles;
