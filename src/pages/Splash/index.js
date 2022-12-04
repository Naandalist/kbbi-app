import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <View style={styles.page}>
      <Text>Splash</Text>
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
