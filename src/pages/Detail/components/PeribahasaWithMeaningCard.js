import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {MAX_PERIBAHASA_ITEMS} from '../constants';
import {sharedStyles} from '../styles/shared.styles';
import {fonts} from '../../../utils';
import {FONT_SIZES} from '../../../constants';

const PeribahasaWithMeaningCard = ({entry}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!entry.terkait?.peribahasa_dan_makna?.length) return null;

  const displayedItems = isExpanded
    ? entry.terkait.peribahasa_dan_makna
    : entry.terkait.peribahasa_dan_makna.slice(0, MAX_PERIBAHASA_ITEMS);
  const hasMoreItems =
    entry.terkait.peribahasa_dan_makna.length > MAX_PERIBAHASA_ITEMS;

  return (
    <View style={sharedStyles.card}>
      <View style={sharedStyles.infoRow}>
        <View style={[sharedStyles.rowHeader, sharedStyles.dashedBorder]}>
          <Icon
            name="quote-left"
            size={16}
            color="rgba(30, 39, 46,0.7)"
            style={styles.titleIcon}
          />
          <Text style={sharedStyles.label}>peribahasa</Text>
        </View>
        <View style={styles.peribahasaContainer}>
          {displayedItems.map((item, i) => (
            <View key={i} style={styles.peribahasaItemWithMeaning}>
              <View style={styles.peribahasaCard}>
                <View style={styles.peribahasaHeader}>
                  <Text style={styles.peribahasaNumber}>{i + 1}.</Text>
                  <Text style={styles.peribahasaText}>{item.peribahasa}</Text>
                </View>
                <View style={styles.meaningContainer}>
                  <Text style={styles.meaningText}>{item.makna}</Text>
                </View>
              </View>
            </View>
          ))}
          {hasMoreItems && (
            <TouchableOpacity
              style={sharedStyles.expandButton}
              onPress={() => setIsExpanded(!isExpanded)}>
              <View style={sharedStyles.expandButtonContent}>
                <Text style={sharedStyles.expandButtonText}>
                  {isExpanded
                    ? 'Tampilkan lebih sedikit'
                    : `Tampilkan ${
                        entry.terkait.peribahasa_dan_makna.length -
                        MAX_PERIBAHASA_ITEMS
                      } lainnya`}
                </Text>
                <IoniconsIcon
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="rgba(30, 39, 46,0.7)"
                  style={sharedStyles.chevronIcon}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleIcon: {
    marginRight: 6,
    marginTop: 1,
  },
  peribahasaContainer: {
    marginTop: 24,
  },
  peribahasaItemWithMeaning: {
    marginBottom: 12,
  },
  peribahasaCard: {
    backgroundColor: '#fefbf0',
    borderLeftWidth: 4,
    borderLeftColor: '#f4c842',
    borderRadius: 4,
    padding: 12,
    marginLeft: 8,
  },
  peribahasaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  peribahasaNumber: {
    fontFamily: fonts.primary[600],
    color: '#2c3e50',
    marginRight: 8,
    minWidth: 20,
    fontSize: FONT_SIZES.L,
  },
  peribahasaText: {
    flex: 1,
    fontFamily: fonts.primary[700],
    color: '#2c3e50',
    lineHeight: 22,
    fontSize: FONT_SIZES.L,
  },
  meaningContainer: {
    paddingLeft: 28, // Align with the peribahasa text (20px number + 8px margin)
  },
  meaningText: {
    fontFamily: fonts.primary[400],
    color: '#5a6c7d',
    lineHeight: 20,
    fontSize: FONT_SIZES.M,
    fontStyle: 'italic',
  },
});

export default PeribahasaWithMeaningCard;
