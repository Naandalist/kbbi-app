import {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {LogoDictionary} from '../../assets';
import {Gap} from '../../components';
import {colors, fonts} from '../../utils';

export default function SplashScreen({navigation}) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    setTimeout(() => navigation.replace('Home'), 3000);
  });

  return (
    <SafeAreaView style={styles.page}>
      <Gap height={20} />
      <Image style={styles.logo} source={LogoDictionary} />
      <Gap height={10} />
      <Text style={styles.title}>KBBI</Text>
      <Text style={styles.subTitle}>Kamus Bahasa Indonesia</Text>
      <Gap height={20} />
      <ActivityIndicator size="large" color={colors.black} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(192, 57, 43,0.2)',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontFamily: fonts.differ.normal,
    fontSize: 25,
    color: colors.black,
  },
  subTitle: {
    fontFamily: fonts.differ.normal,
    fontSize: 15,
    marginTop: -5,
    color: colors.black,
  },
});
