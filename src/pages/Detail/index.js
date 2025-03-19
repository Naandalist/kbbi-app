import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Detail({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{color: 'black', padding: 20}}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
