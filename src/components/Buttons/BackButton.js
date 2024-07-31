import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../common/Colors';
import SvgUri from 'react-native-svg-uri';

export default function BackButton(props) {
  const {onPress, containerStyle, imgStyle, image} = props;
  return (
    <>
      <TouchableOpacity
        style={{...styles.container, ...containerStyle}}
        onPress={onPress}>
        {image ? (
          <SvgUri width={17} height={17} source={image} style={{...styles.img,...imgStyle}} />
        ) : (
          <MaterialIcons
            name="arrow-back"
            size={22}
            color={Colors.primaryBlack}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: Colors.primaryWhite,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowColor: Colors.primaryBlack,
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 4,
  },
  img: {
    alignSelf: 'center',
    marginTop: 7
  },
});
