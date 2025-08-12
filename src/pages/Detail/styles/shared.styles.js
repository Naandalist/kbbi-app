import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../utils';
import {FONT_SIZES} from '../../../constants';

export const sharedStyles = StyleSheet.create({
  // LAYOUT CONTAINERS
  card: {
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 10,
  },

  // INFO ROWS & HEADERS
  infoRow: {
    marginBottom: 10,
  },
  dashedBorder: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderBottomColor: 'grey',
    paddingBottom: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    marginTop: 12,
  },
  label: {
    color: 'rgba(30, 39, 46,0.7)',
    fontFamily: fonts.primary[600],
  },
  exponent: {
    fontSize: FONT_SIZES.XS,
    lineHeight: 18,
    color: 'rgba(30, 39, 46,0.7)',
    fontFamily: fonts.primary[600],
    marginLeft: 4,
  },
  content: {
    color: 'black',
    fontFamily: fonts.primary[700],
    marginTop: 4,
  },
  boldText: {
    fontFamily: fonts.primary[700],
  },

  // TAGS & ACCORDION
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontFamily: fonts.primary[600],
    color: '#2563eb',
    fontSize: FONT_SIZES.M,
  },
  expandButtonContainer: {
    width: '100%',
    marginTop: 8,
  },
  expandButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 0,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  expandButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandButtonText: {
    color: 'rgba(30, 39, 46,0.7)',
    fontFamily: fonts.primary[600],
    fontSize: FONT_SIZES.S,
  },
  chevronIcon: {
    marginLeft: 6,
  },
});
