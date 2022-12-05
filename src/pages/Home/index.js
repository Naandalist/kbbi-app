import {StyleSheet, Text, View, TextInput} from 'react-native';
import {useState} from 'react';
import {colors, fonts} from '../../utils';
import {IconClose, IconSearch} from '../../assets';
import {Gap} from '../../components';

export default function HomeScreen() {
  const [text, setText] = useState('');
  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Kamus Indonesia 😄</Text>
        <Text style={styles.headerDesc}>
          Membantu pencarian definisi kata atau frasa berdasarkan Kamus Besar
          Bahasa Indonesia (KBBI).
        </Text>
        <Gap height={20} />
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <IconSearch />
            <Gap width={10} />
            <TextInput
              style={styles.input}
              onChangeText={val => setText(val)}
              value={text}
              placeholder="Cari kata atau frasa"
              editable={true}
            />
          </View>

          <IconClose width={20} />
        </View>
      </View>
      <Gap height={16} />
      <View style={styles.content}>
        <Text style={styles.lemaTitle}>bin.tang</Text>
        <Text style={styles.label}>Kata dasar</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.content}>
        <View style={{flexDirection: 'row',}}>
          <Text>1</Text>
          <View style={{paddingHorizontal:10}}>
            <Text style={styles.label}>Kata benda</Text>
            <Text style={styles.desc}>
              benda langit yang mampu memancarkan cahaya dan memproduksi energi
              sendiri, misalnya matahari: pada malam itu tampak -- bertaburan di
              langit
            </Text>
          </View>
        </View>
        <Gap height={20}/>
        <View style={{flexDirection: 'row',}}>
          <Text>1</Text>
          <View style={{paddingHorizontal:10}}>
            <Text style={styles.label}>Kata benda</Text>
            <Text style={styles.desc}>
              benda langit yang mampu memancarkan cahaya dan memproduksi energi
              sendiri, misalnya matahari: pada malam itu tampak -- bertaburan di
              langit
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.page,
  },
  headerContainer: {
    backgroundColor: colors.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontFamily: fonts.differ.normal,
    fontSize: 30,
    color: colors.white,
  },
  headerDesc: {
    fontFamily: fonts.primary[700],
    color: colors.white,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '80%',
  },
  content: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  lemaTitle: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.subTitle,
    fontStyle: 'italic',
  },
  border: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    // backgroundColor:'yellow'
  },
});
