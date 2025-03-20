import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, memo, useEffect} from 'react';
import {colors, fonts, showError} from '../../utils';
import {IconArrowRight, IconClose, IconSearch} from '../../assets';
import {Gap} from '../../components';
import {getData} from '../../utils/api';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {wordlist} from '../../constants/wordlist';

const ITEM_HEIGHT = 40;
const ITEMS_PER_PAGE = 50;

const alphabetLetters = Array.from({length: 26}, (_, i) =>
  String.fromCharCode(65 + i),
);

// Memoized item components for better performance
const WordItem = memo(({item, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.wordItem}>
      <Text style={styles.wordText}>{item}</Text>
    </View>
  </TouchableOpacity>
));

const LetterButton = memo(({letter, isSelected, onPress}) => (
  <TouchableOpacity onPress={() => onPress(letter)}>
    <View
      style={[
        styles.letterButton,
        {backgroundColor: isSelected ? 'white' : '#c0392b'},
      ]}>
      <Text
        style={[styles.letterText, {color: isSelected ? '#c0392b' : 'white'}]}>
        {letter}
      </Text>
    </View>
  </TouchableOpacity>
));

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [wordToFind, setWordToFind] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('A');
  const [displayedData, setDisplayedData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Filter wordlist based on selected letter
  useEffect(() => {
    let filtered = wordlist[selectedFilter] || [];

    setFilteredList(filtered);
    setDisplayedData(filtered.slice(0, ITEMS_PER_PAGE));
    setEndReached(false);
  }, [selectedFilter]);

  const getDataFromKBBI = useCallback(async () => {
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        return showError('Mohon pastikan device terhubung dengan internet!');
      }

      if (wordToFind.length <= 1) {
        return showError('Ketikan kata minimal 2 huruf');
      }

      dispatch({type: 'SET_LOADING', value: true});
      const response = await getData(wordToFind);
      dispatch({type: 'SET_LOADING', value: false});

      if (response.error) {
        showError('Kata yang dicari tidak ditemukan dalam KBBI.');
        return;
      }

      if (!response.error && response.data.status) {
        // setDefinition(response.data.data);
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      showError('Terjadi kesalahan dalam pencarian');
    }
  }, [wordToFind, dispatch]);

  const onSubmitSearching = useCallback(() => {
    getDataFromKBBI();
  }, [getDataFromKBBI]);

  const onLetterPress = useCallback(letter => {
    setSelectedFilter(letter);
  }, []);

  // Improve load more logic with loading indicator
  const loadMoreData = useCallback(() => {
    if (loading || displayedData.length >= filteredList.length) {
      setEndReached(displayedData.length >= filteredList.length);
      return;
    }

    setLoading(true);

    // Simulate network delay for smoother UX
    setTimeout(() => {
      const newData = filteredList.slice(
        displayedData.length,
        displayedData.length + ITEMS_PER_PAGE,
      );

      setDisplayedData(prevData => [...prevData, ...newData]);
      setLoading(false);
      setEndReached(
        displayedData.length + newData.length >= filteredList.length,
      );
    }, 1000);
  }, [displayedData.length, filteredList, loading]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderLetterButton = useCallback(
    ({item}) => (
      <LetterButton
        letter={item}
        isSelected={selectedFilter === item}
        onPress={onLetterPress}
      />
    ),
    [selectedFilter, onLetterPress],
  );

  const renderWord = useCallback(
    ({item}) => (
      <>
        <View style={styles.wordItemWrapper}>
          <WordItem
            item={item}
            onPress={() =>
              navigation.navigate('Detail', {
                pressedWord: item,
                selectedLetter: selectedFilter,
              })
            }
          />
        </View>
      </>
    ),
    [onLetterPress, navigation],
  );

  const renderFooter = useCallback(() => {
    if (!loading && !endReached) return null;

    return (
      <View style={styles.footerContainer}>
        {loading && <ActivityIndicator size="large" color="#999999" />}
        {endReached && (
          <Text style={styles.endListText}>No more words to load</Text>
        )}
      </View>
    );
  }, [loading, endReached]);

  const keyExtractor = useCallback((_, index) => index.toString(), []);
  const letterKeyExtractor = useCallback(item => item, []);

  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        {!inputFocused && (
          <>
            <Text style={styles.headerTitle}>Kamus Bahasa Indonesia</Text>
            <Text style={styles.headerDesc}>
              Fasilitas pencarian definisi kata atau frasa berdasarkan KBBI VI.
              😁
            </Text>
          </>
        )}

        <Gap height={20} />
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <IconSearch />
            <Gap width={10} />
            <TextInput
              style={styles.input}
              onChangeText={setWordToFind}
              value={wordToFind}
              placeholder="Cari kata atau frasa"
              editable={true}
              onSubmitEditing={onSubmitSearching}
              color="black"
              placeholderTextColor="gray"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
          </View>
          {wordToFind !== '' && (
            <TouchableOpacity onPress={() => setWordToFind('')}>
              <IconClose width={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.alphabetContainer}>
        <FlatList
          data={alphabetLetters}
          renderItem={renderLetterButton}
          keyExtractor={letterKeyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.alphabetList}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={5}
          removeClippedSubviews={true}
        />
      </View>

      <View style={styles.wordListContainer}>
        <FlatList
          data={displayedData}
          renderItem={renderWord}
          keyExtractor={keyExtractor}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          keyboardShouldPersistTaps="handled"
          windowSize={10}
          ListFooterComponent={renderFooter}
        />
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
    backgroundColor: '#c0392b',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontFamily: fonts.differ.normal,
    fontSize: 25,
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
    flex: 1,
  },
  input: {
    height: 50,
    flex: 1,
    color: 'black',
  },
  alphabetContainer: {
    backgroundColor: '#c0392b',
    paddingBottom: 18,
  },
  alphabetList: {
    paddingHorizontal: 10,
  },
  letterButton: {
    marginTop: 20,
    marginHorizontal: 5,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  letterText: {
    fontFamily: fonts.differ.normal,
  },
  wordListContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  wordItemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dashed',
    paddingBottom: 3,
  },
  wordItem: {
    marginTop: 20,
    marginHorizontal: 5,
  },
  wordText: {
    color: 'black',
    fontSize: 18,
    fontFamily: fonts.primary[600],
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
  rowContainer: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    paddingHorizontal: 10,
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
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  footerContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
