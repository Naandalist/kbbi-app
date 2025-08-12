import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MAX_PERIBAHASA_ITEMS} from '../constants';
import {sharedStyles} from '../styles/shared.styles';
import {fonts} from '../../../utils';

const PeribahasaCard = ({entry}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!entry.terkait?.peribahasa?.length) return null;

  const displayedItems = isExpanded
    ? entry.terkait.peribahasa
    : entry.terkait.peribahasa.slice(0, MAX_PERIBAHASA_ITEMS);
  const hasMoreItems = entry.terkait.peribahasa.length > MAX_PERIBAHASA_ITEMS;

  return (
    <View style={sharedStyles.card}>
      <View style={sharedStyles.infoRow}>
        <View style={[sharedStyles.rowHeader, sharedStyles.dashedBorder]}>
          <Text style={sharedStyles.label}>peribahasa</Text>
        </View>
        <View style={styles.peribahasaContainer}>
          {displayedItems.map((item, i) => (
            <View key={i} style={styles.peribahasaItem}>
              <Text style={styles.peribahasaNumber}>{i + 1}.</Text>
              <Text style={styles.peribahasaText}>{item}</Text>
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
                        entry.terkait.peribahasa.length - MAX_PERIBAHASA_ITEMS
                      } lainnya`}
                </Text>
                <Icon
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
  peribahasaContainer: {
    marginTop: 5,
  },
  peribahasaItem: {
    flexDirection: 'row',
    marginTop: 4,
    marginLeft: 8,
  },
  peribahasaNumber: {
    fontFamily: fonts.primary[600],
    color: 'black',
    marginRight: 8,
    minWidth: 20,
  },
  peribahasaText: {
    flex: 1,
    fontFamily: fonts.primary[400],
    color: 'black',
    lineHeight: 20,
  },
});

export default PeribahasaCard;
