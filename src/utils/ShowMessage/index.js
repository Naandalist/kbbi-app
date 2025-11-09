import {showMessage} from 'react-native-flash-message';
import {colors} from '@/utils/colors';

export const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.primary,
    color: colors.white,
    icon: 'danger',
    position: 'bottom',
  });
};

export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.success,
    color: colors.white,
    icon: 'success',
  });
};
