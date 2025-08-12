import {useState, useCallback, memo, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import BootSplash from 'react-native-bootsplash';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  colors,
  fonts,
  fuzzySearch,
  networkStatus,
  showError,
} from '../../utils';
import {Gap} from '../../components';
import {wordlist} from '../../constants/wordlist';
import {FONT_SIZES} from '../../constants';
import {useDebounce} from '../../hooks';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

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
        isSelected ? styles.selectedButton : styles.unselectedButton,
      ]}>
      <Text
        style={[
          styles.letterText,
          isSelected ? styles.selectedText : styles.unselectedText,
        ]}>
        {letter}
      </Text>
    </View>
  </TouchableOpacity>
));

export default function HomeScreen({navigation}) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    BootSplash.hide({fade: true, duration: 1000});
  }, []);

  const [wordToFind, setWordToFind] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('A');
  const [displayedData, setDisplayedData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const debouncedWordToFind = useDebounce(wordToFind, 400);

  // Filter wordlist based on selected letter
  useEffect(() => {
    let selectedWrodlist = wordlist[selectedFilter] || [];

    // Filter words based on the input
    if (debouncedWordToFind.length > 1) {
      selectedWrodlist = fuzzySearch(selectedWrodlist, debouncedWordToFind);
    }

    setFilteredList(selectedWrodlist);
    setDisplayedData(selectedWrodlist.slice(0, ITEMS_PER_PAGE));
    setEndReached(false);
  }, [selectedFilter, debouncedWordToFind]);

  const onLetterPress = useCallback(letter => {
    setSelectedFilter(letter);
    setWordToFind('');
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

  const handleWordPress = useCallback(
    async item => {
      try {
        const isConnected = await networkStatus.isConnected();

        if (isConnected) {
          navigation.navigate('Detail', {
            pressedWord: item,
            selectedLetter: selectedFilter.toLowerCase(),
          });
        } else {
          showError('Gagal memuat data. Periksa koneksi internet Anda!');
        }
      } catch (error) {
        console.error('Error checking network status:', error);
      }
    },
    [navigation, selectedFilter],
  );

  const renderWord = useCallback(
    ({item}) => (
      <>
        <View style={styles.wordItemWrapper}>
          <WordItem item={item} onPress={() => handleWordPress(item)} />
        </View>
      </>
    ),
    [handleWordPress],
  );

  const renderSearchForm = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Icon name="search" size={20} color={colors.primary} />
          <Gap width={10} />
          <TextInput
            style={styles.input}
            onChangeText={setWordToFind}
            value={wordToFind}
            placeholder="Cari kata atau frasa"
            editable={true}
            color={colors.black}
            placeholderTextColor="gray"
          />
        </View>
        {wordToFind !== '' && (
          <TouchableOpacity onPress={() => setWordToFind('')}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderFooter = useCallback(() => {
    if (!loading && !endReached) {
      return null;
    }

    return (
      <View style={styles.footerContainer}>
        {loading && <ActivityIndicator size="large" color="#999999" />}
        {endReached && wordToFind.length < 1 && (
          <Text style={styles.endListText}>No more words to load</Text>
        )}
      </View>
    );
  }, [loading, endReached, wordToFind.length]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Kata tidak ditemukan dalam KBBI.</Text>
    </View>
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);
  const letterKeyExtractor = useCallback(item => item, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <SafeAreaView style={styles.page} edges={['left', 'bottom', 'right']}>
        <View style={styles.safeAreaTop}>
          <View style={[styles.headerContainer, {paddingTop: insets.top + 20}]}>
            <Text style={styles.headerTitle}>Kamus Bahasa Indonesia</Text>
            <Text style={styles.headerDesc}>
              Aplikasi pencarian definisi kata atau frasa berdasarkan KBBI VI
              😁.
            </Text>
          </View>
          <View style={styles.alphabetContainer}>
            <FlashList
              data={alphabetLetters}
              renderItem={renderLetterButton}
              keyExtractor={letterKeyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.alphabetList}
              estimatedItemSize={50}
            />
          </View>

          <View style={styles.searchFormContainer}>{renderSearchForm()}</View>

          <View style={styles.wordListContainer}>
            <FlashList
              data={displayedData}
              renderItem={renderWord}
              keyExtractor={keyExtractor}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              estimatedItemSize={ITEM_HEIGHT}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmpty}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeAreaTop: {
    flex: 1,
    backgroundColor: colors.page,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: fonts.differ.normal,
    fontSize: FONT_SIZES['3XL'],
    color: colors.white,
  },
  headerDesc: {
    fontFamily: fonts.primary[700],
    color: colors.white,
    fontSize: FONT_SIZES.L,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    height: 45,
    flex: 1,
    textDecorationLine: 'none',
    color: colors.black,
    fontFamily: fonts.primary[600],
    backgroundColor: colors.white,
  },
  clearText: {
    color: 'grey',
    fontSize: FONT_SIZES.S,
  },
  alphabetContainer: {
    backgroundColor: colors.primary,
    paddingBottom: 18,
  },
  alphabetList: {
    paddingHorizontal: 10,
  },
  searchFormContainer: {
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  letterButton: {
    marginTop: 20,
    marginHorizontal: 5,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 2,
  },
  letterText: {
    fontFamily: fonts.differ.normal,
  },
  wordListContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  wordItemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    borderStyle: 'dashed',
    paddingBottom: 3,
  },
  wordItem: {
    marginTop: 20,
    marginHorizontal: 5,
  },
  wordText: {
    color: colors.black,
    fontSize: FONT_SIZES.XL,
    fontFamily: fonts.primary[600],
  },

  footerContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: FONT_SIZES.L,
    color: '#888',
  },
  selectedButton: {
    backgroundColor: 'white',
  },
  unselectedButton: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.primary,
  },
  unselectedText: {
    color: 'white',
  },
});
