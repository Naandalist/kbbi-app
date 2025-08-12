import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {removeSuperscriptDigits, fonts} from '../../../utils';
import {FONT_SIZES} from '../../../constants';

const ExampleList = ({list}) => (
  <View style={styles.exampleContainer}>
    <Text style={styles.exampleLabel}>contoh:</Text>
    {list.map((ex, i) => (
      <View key={i} style={styles.exampleItem}>
        <Text style={styles.exampleNumber}>{i + 1}.</Text>
        <Text style={styles.exampleTextList}>
          {removeSuperscriptDigits(ex.teks)}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  exampleContainer: {
    marginBottom: 20,
  },
  exampleLabel: {
    fontFamily: fonts.primary[600],
    color: 'rgba(30, 39, 46,0.7)',
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginLeft: 8,
  },
  exampleNumber: {
    fontFamily: fonts.primary[400],
    color: 'black',
    minWidth: 20,
    fontSize: FONT_SIZES.S,
    marginTop: 2,
  },
  exampleTextList: {
    flex: 1,
    fontFamily: fonts.primary[400],
    color: 'black',
    lineHeight: 20,
  },
});

export default ExampleList;
