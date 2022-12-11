import {useEffect} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {LogoDictionary, LogoKbbi} from '../../assets';
import {Gap} from '../../components';
import {colors, fonts} from '../../utils';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(()=> navigation.replace("Home"), 3000)
  });

  return (
    <View style={styles.page}>
      <Gap height={20} />
      <Image style={styles.logo} source={LogoDictionary} />
      <Gap height={10} />
      <Text style={styles.title}>KBBI</Text>
      <Text style={styles.subTitle}>Kamus Indonesia</Text>
      <Gap height={20} />
      <ActivityIndicator  color={colors.black} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f4fc',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontFamily: fonts.differ.normal,
    fontSize: 25,
  },
  subTitle: {
    fontFamily: fonts.differ.normal,
    fontSize: 15,
    marginTop: -5,
  },
});
