import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useState, useCallback} from 'react';
import {colors, fonts, showError} from '../../utils';
import {IconClose, IconSearch} from '../../assets';
import {Gap} from '../../components';
import {getData} from '../../utils/api';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [wordToFind, setWordToFind] = useState('');
  const [definition, setDefinition] = useState([]);

  const getDataFromKBBI = useCallback(async () => {
    await NetInfo.fetch().then(async state => {
      if (!state.isConnected) {
        return showError('Mohon pastikan device terhubung dengan internet!');
      } else {
        if (wordToFind.length > 1) {
          dispatch({type: 'SET_LOADING', value: true});
          const response = await getData(wordToFind);

          if (response) {
            dispatch({type: 'SET_LOADING', value: false});
          }

          if (response.error) {
            showError('Kata yang dicari tidak ditemukan dalam KBBI.');
          }

          if (!response.error && response.data.status) {
            setDefinition(response.data.data);
          }
        } else {
          dispatch({type: 'SET_LOADING', value: false});
          showError('Ketikan kata minimal 2 huruf');
        }
      }
    });
  });

  const onSubmitSearching = () => {
    getDataFromKBBI();
  };

  const renderItem = ({item}) => {
    return (
      <>
        <Gap height={16} />
        <View style={styles.content}>
          <Text style={styles.lemaTitle}>{item.lema}</Text>
          <Text style={styles.label}>Kata dasar</Text>
        </View>
        {item.arti.map((val, index) => {
          return (
            <View style={styles.subContent} key={index}>
              <View style={{flexDirection: 'row'}}>
                <Text>{index + 1}</Text>
                <View style={{paddingHorizontal: 10}}>
                  <Text style={styles.label}>{val.kelas_kata}</Text>
                  <Text style={styles.desc}>{val.deskripsi}</Text>
                </View>
              </View>
              {index === item.arti.length - 1 ? <Gap height={20} /> : null}
            </View>
          );
        })}
        <Gap height={16} />
        <View style={styles.content}>
          <Text style={styles.lemaTitle}>{item.lema}</Text>
          <Text style={styles.label}>Kata dasar</Text>
        </View>
        {item.arti.map((val, index) => {
          return (
            <View style={styles.subContent} key={index}>
              <View style={{flexDirection: 'row'}}>
                <Text>{index + 1}</Text>
                <View style={{paddingHorizontal: 10}}>
                  <Text style={styles.label}>{val.kelas_kata}</Text>
                  <Text style={styles.desc}>{val.deskripsi}</Text>
                </View>
              </View>
              {index === item.arti.length - 1 ? <Gap height={20} /> : null}
            </View>
          );
        })}
      </>
    );
  };

  return (
    <>
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
                onChangeText={val => setWordToFind(val)}
                value={wordToFind}
                placeholder="Cari kata atau frasa"
                editable={true}
                onSubmitEditing={onSubmitSearching}
              />
            </View>
            <TouchableOpacity style={{}} onPress={() => setWordToFind('')}>
              <IconClose width={20} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={definition}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
        <Text style={styles.footer}>©CraftWith Naandalist</Text>
      </View>
    </>
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
  subContent: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 5,
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
  footer: {
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: fonts.primary[400],
    backgroundColor: colors.white,
  },
});
