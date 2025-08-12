import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {removeSuperscriptDigits} from '../../../utils';
import {sharedStyles} from '../styles/shared.styles';

const ClickableInfoRow = ({
  label,
  text,
  tags,
  exponent,
  hasBorder,
  icon,
  iconLibrary,
  textStyle,
  onTagPress,
}) => {
  const IconComponent = iconLibrary === 'fontawesome' ? FontAwesomeIcon : Icon;

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
        {exponent != null && (
          <Text style={sharedStyles.exponent}>{exponent}</Text>
        )}
      </View>
      {text && (
        <Text style={[sharedStyles.content, sharedStyles.boldText, textStyle]}>
          {removeSuperscriptDigits(text)}
        </Text>
      )}
      {tags && (
        <View style={sharedStyles.tagsContainer}>
          {tags.map((tag, i) => (
            <TouchableOpacity
              key={i}
              style={sharedStyles.tag}
              onPress={() => onTagPress && onTagPress(tag, i)}
              activeOpacity={0.7}>
              <Text style={sharedStyles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

ClickableInfoRow.defaultProps = {
  text: null,
  tags: null,
  exponent: null,
  hasBorder: false,
  icon: null,
  iconLibrary: 'ionicons',
  textStyle: null,
  onTagPress: null,
};

const styles = StyleSheet.create({
  titleIcon: {
    marginRight: 6,
    marginTop: 1,
  },
});

export default ClickableInfoRow;
