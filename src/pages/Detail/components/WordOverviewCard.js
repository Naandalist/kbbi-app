import React from 'react';
import {View, StyleSheet} from 'react-native';
import InfoRow from './InfoRow';
import TagsAccordion from './TagsAccordion';
import {sharedStyles} from '../styles/shared.styles';
import {FONT_SIZES} from '../../../constants';

const WordOverviewCard = ({word, entry}) => {
  const hasEjaan = entry.nama && entry.nama !== word;
  const labelText = hasEjaan ? 'kata dasar dan ejaan' : 'kata dasar';
  const displayText = hasEjaan ? `${word} (${entry.nama})` : word;

  return (
    <View style={sharedStyles.card}>
      <InfoRow
        label={labelText}
        text={displayText}
        icon="cube-outline"
        textStyle={styles.largeText}
      />
      {entry.rootWord && (
        <InfoRow label="akar kata" text={entry.rootWord} hasBorder />
      )}
      {entry.terkait?.kataTurunan?.length > 0 && (
        <TagsAccordion
          label="kata turunan"
          list={entry.terkait.kataTurunan}
          hasBorder
          icon="git-branch-outline"
          colorTheme="green"
        />
      )}
      {entry.terkait?.gabunganKata?.length > 0 && (
        <TagsAccordion
          label="kata gabungan"
          list={entry.terkait.gabunganKata}
          twoColumns={entry.terkait.gabunganKata.length > 1}
          icon="chain"
          iconLibrary="fontawesome"
          colorTheme="orange"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  largeText: {
    fontSize: FONT_SIZES.XL,
  },
});

export default WordOverviewCard;
