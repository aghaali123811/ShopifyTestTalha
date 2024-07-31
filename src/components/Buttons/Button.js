import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../common/Colors';
import SvgUri from 'react-native-svg-uri';

export default function ButtonWithImage(props) {
  const {onPress, containerStyle, titleStyle, btnTitle,icon} = props;
  return (
    <TouchableOpacity
      style={{...styles.container, ...containerStyle}}
      onPress={onPress}>
     {icon &&  <SvgUri width={20} height={20} style={styles.img} source={icon} />}
      <Text allowFontScaling={false} style={{...styles.title, ...titleStyle}}>
        {btnTitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginTop: 20,
    backgroundColor: Colors.primaryYellow,
    borderRadius: 4,
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  img:{
    alignSelf:'center',
    marginHorizontal:10
  }
});
