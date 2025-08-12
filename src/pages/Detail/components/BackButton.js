import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';

const BackButton = ({onPress}) => (
  <View style={styles.backButtonContainer}>
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Icon name="close-outline" size={30} color="black" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  backButtonContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.page,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
});

export default BackButton;
