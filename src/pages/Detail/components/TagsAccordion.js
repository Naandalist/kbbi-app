import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {MAX_ACCORDION_ITEMS} from '../constants';
import {sharedStyles} from '../styles/shared.styles';
import {fonts} from '../../../utils';
import {FONT_SIZES} from '../../../constants';

const TagsAccordion = ({
  list,
  label,
  hasBorder,
  twoColumns = false,
  icon,
  iconLibrary = 'ionicons',
  colorTheme = 'default',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedTags = isExpanded ? list : list.slice(0, MAX_ACCORDION_ITEMS);
  const hasMoreItems = list.length > MAX_ACCORDION_ITEMS;

  const IconComponent =
    iconLibrary === 'fontawesome' ? FontAwesomeIcon : IoniconsIcon;

  const getTagStyle = () => {
    switch (colorTheme) {
      case 'green':
        return styles.greenTag;
      case 'orange':
        return styles.orangeTag;
      default:
        return sharedStyles.tag;
    }
  };

  const getTagTextStyle = () => {
    switch (colorTheme) {
      case 'green':
        return styles.greenTagText;
      case 'orange':
        return styles.orangeTagText;
      default:
        return sharedStyles.tagText;
    }
  };

  const getTwoColumnTagStyle = () => {
    switch (colorTheme) {
      case 'green':
        return styles.greenColumnTag;
      case 'orange':
        return styles.orangeColumnTag;
      default:
        return styles.columnTag;
    }
  };

  const renderTags = () => {
    if (twoColumns) {
      // Create pairs for two-column layout
      const pairs = [];
      for (let i = 0; i < displayedTags.length; i += 2) {
        pairs.push(displayedTags.slice(i, i + 2));
      }

      return (
        <View style={styles.twoColumnContainer}>
          {pairs.map((pair, pairIndex) => (
            <View key={pairIndex} style={styles.rowContainer}>
              {pair.map((tag, tagIndex) => (
                <View
                  key={pairIndex * 2 + tagIndex}
                  style={getTwoColumnTagStyle()}>
                  <Text style={getTagTextStyle()}>{tag}</Text>
                </View>
              ))}
              {/* Add empty space if odd number of items in last row */}
              {pair.length === 1 && <View style={getTwoColumnTagStyle()} />}
            </View>
          ))}
        </View>
      );
    }

    // Default single-column layout
    return (
      <View style={sharedStyles.tagsContainer}>
        {displayedTags.map((tag, i) => (
          <View key={i} style={getTagStyle()}>
            <Text style={getTagTextStyle()}>{tag}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View
      style={[sharedStyles.infoRow, hasBorder && sharedStyles.dashedBorder]}>
      <View style={sharedStyles.rowHeader}>
        {icon && (
          <IconComponent
            name={icon}
            size={16}
            color="rgba(30, 39, 46,0.7)"
            style={styles.titleIcon}
          />
        )}
        <Text style={sharedStyles.label}>{label}</Text>
      </View>
      {renderTags()}
      {hasMoreItems && (
        <View style={sharedStyles.expandButtonContainer}>
          <TouchableOpacity
            style={sharedStyles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)}>
            <View style={sharedStyles.expandButtonContent}>
              <Text style={sharedStyles.expandButtonText}>
                {isExpanded
                  ? 'Tampilkan lebih sedikit'
                  : `Tampilkan ${list.length - MAX_ACCORDION_ITEMS} lainnya`}
              </Text>
              <IoniconsIcon
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={16}
                color="rgba(30, 39, 46,0.7)"
                style={sharedStyles.chevronIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleIcon: {
    marginRight: 6,
    marginTop: 1, // Slight adjustment for better alignment
  },
  twoColumnContainer: {
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  columnTag: {
    backgroundColor: '#e4eff9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 2,
    flex: 1,
    marginRight: 8,
    minHeight: 24, // Ensure consistent height even for empty slots
  },
  // Green theme for kata turunan
  greenTag: {
    backgroundColor: '#dcfce7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  greenTagText: {
    fontFamily: fonts.primary[600],
    color: '#16a34a',
    fontSize: FONT_SIZES.M,
  },
  greenColumnTag: {
    backgroundColor: '#dcfce7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 2,
    flex: 1,
    marginRight: 8,
    minHeight: 24,
  },
  orangeTag: {
    backgroundColor: '#fed7aa',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  orangeTagText: {
    fontFamily: fonts.primary[600],
    color: '#a44e04ff',
    fontSize: FONT_SIZES.M,
  },
  orangeColumnTag: {
    backgroundColor: '#fed7aa',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    marginRight: 8,
    minHeight: 24,
  },
});

export default TagsAccordion;
