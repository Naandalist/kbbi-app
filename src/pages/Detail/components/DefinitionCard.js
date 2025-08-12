import React from 'react';
import {View, StyleSheet} from 'react-native';
import InfoRow from './InfoRow';
import ClickableInfoRow from './ClickableInfoRow';
import ExampleList from './ExampleList';
import {sharedStyles} from '../styles/shared.styles';

const DefinitionItem = ({meaning, displayExponent}) => {
  const examples = meaning.contoh.filter(ex => ex.teks?.length > 0);

  return (
    <View style={styles.definitionContainer}>
      <InfoRow
        label="definisi"
        text={meaning.definisi}
        exponent={displayExponent ? meaning.nomor : null}
        icon="book"
        iconLibrary="fontawesome"
      />
      {examples.length > 0 && <ExampleList list={examples} />}
    </View>
  );
};

const DefinitionCard = ({entry, isMultiple, index, onTagPress}) => {
  const exponent = isMultiple ? index + 1 : null;
  const kelasKataItems = entry.makna[0]?.kelasKata || [];
  const posTags = kelasKataItems.map(({kode, nama}) => `(${kode}) ${nama}`);

  const handleTagPress = (tag, tagIndex) => {
    // Pass the original kode (not the formatted tag) and the original kelasKata object
    const kelasKataItem = kelasKataItems[tagIndex];
    if (onTagPress) {
      // Use the original kode for lookup, not the formatted tag
      onTagPress(kelasKataItem.kode, tagIndex, kelasKataItem);
    }
  };

  return (
    <View style={sharedStyles.card}>
      {posTags?.length > 0 && (
        <ClickableInfoRow
          label="kelas kata"
          tags={posTags}
          exponent={exponent}
          hasBorder
          icon="pricetags-outline"
          onTagPress={handleTagPress}
        />
      )}
      {entry.makna.map(m => (
        <DefinitionItem
          key={m.nomor || m.definisi}
          meaning={m}
          displayExponent={entry.makna.length > 1}
        />
      ))}
    </View>
  );
};

DefinitionCard.defaultProps = {
  isMultiple: false,
  onTagPress: null,
};

const styles = StyleSheet.create({
  definitionContainer: {
    marginTop: 10,
  },
});

export default DefinitionCard;
