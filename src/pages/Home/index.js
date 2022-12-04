import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
