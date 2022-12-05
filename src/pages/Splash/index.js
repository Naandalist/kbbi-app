import { useEffect } from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {LogoKbbiWhite} from '../../assets';
import {Gap} from '../../components';
import {colors} from '../../utils';

export default function SplashScreen({navigation}) {

  useEffect(()=>{
    setTimeout(()=> navigation.replace("Home"), 2000)
  })

  return (
    <View style={styles.page}>
       <Gap height={20} />
      <Image style={styles.logo} source={LogoKbbiWhite} />
      <Gap height={20} />
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tertiary,
  },
  logo: {
    width: 150,
    height: 70,
  },
});
