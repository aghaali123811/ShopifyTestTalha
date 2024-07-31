import React from 'react';
import {
    View,
    ActivityIndicator
  } from 'react-native';
import Colors from '../../common/Colors';

  export default function Loader() {
    return (
<View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: Colors.black50,
          zIndex:999
        }}>
          <ActivityIndicator size="large" color={Colors.primaryBlue} />
        </View>
    )
  };