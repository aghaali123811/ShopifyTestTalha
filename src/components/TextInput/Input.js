import React from 'react';
import {View, StyleSheet, Image, TextInput, Text} from 'react-native';
import Colors from '../../common/Colors';
import SvgUri from 'react-native-svg-uri';

export default function Input(props) {
  const {
    icon,
    value,
    placeholder,
    onChangeText,
    containerStyle,
    topText,
    inputStyle,
    multiline,
    iconStyle,
    topTextStyle,
    maxLength,
    keyboardType,
    numberOfLines,
    editable,
    secureTextEntry,
  } = props;
  return (
    <View style={{...styles.container, ...containerStyle}}>
      {icon && (
        <SvgUri
          width={18}
          height={18}
          style={{...styles.icon, ...iconStyle}}
          source={icon}
        />
      )}
      <View>
        {topText && (
          <Text
            allowFontScaling={false}
            style={{...styles.topText, ...topTextStyle}}>
            {topText}
          </Text>
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutralGrey}
          onChangeText={onChangeText}
          style={{...styles.input, ...inputStyle}}
          multiline={multiline}
          autoCapitalize={'none'}
          editable={editable}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: Colors.greyBlack,
    marginTop: 10,
    borderRadius: 5,
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: 12,
    width: 18,
    height: 18,
  },
  input: {
    width: 285,
    height: 50,
    color: Colors.neutralGrey,
    paddingLeft: 12,
  },
  topText: {
    fontSize: 12,
    color: Colors.neutralGrey,
    marginTop: 3,
  },
});
