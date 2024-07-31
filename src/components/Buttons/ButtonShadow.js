import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Colors from '../../common/Colors';
import SvgUri from 'react-native-svg-uri';

export default function ButtonShadow(props) {
  const {onPress, containerStyle, titleStyle, btnTitle, icon, icon2} = props;
  return (
    <TouchableOpacity
      style={{...styles.container, ...containerStyle}}
      onPress={onPress}>
      {icon && <SvgUri style={styles.icon} source={icon} />}
      <Text allowFontScaling={false} style={{...styles.title, ...titleStyle}}>
        {btnTitle}
      </Text>
      {icon2 && <SvgUri style={styles.icon2} source={icon2} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    height: 55,
    backgroundColor: Colors.primaryWhite,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: Colors.primaryBlack,
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  title: {
    color: Colors.neutralGrey,
  },
  icon: {
    marginHorizontal: 12,
  },
  icon2:{
    position:'absolute',
    right:0,
    marginRight:20
  }
});
