import React, {useCallback, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View, StatusBar} from 'react-native';
import {colors, fonts} from '../../utils';
import {Gap, NativeAdCard} from '../../components';
import SkeletonLoader from './SkeletonLoader';
import {SafeAreaView} from 'react-native-safe-area-context';

// Modular imports
import {useWordDetail} from './hooks/useWordDetail';
import {useKelasKata} from './hooks/useKelasKata';
import BackButton from './components/BackButton';
import WordOverviewCard from './components/WordOverviewCard';
import DefinitionCard from './components/DefinitionCard';
import PeribahasaWithMeaningCard from './components/PeribahasaWithMeaningCard';
import KelasKataBottomSheet from './components/KelasKataBottomSheet';

export default function Detail({route, navigation}) {
  const {pressedWord, selectedLetter} = route.params;
  const {wordDetail} = useWordDetail(selectedLetter, pressedWord);
  const {getInfoByCodeAndType, kelasKataData, bahasaData} = useKelasKata();

  // Bottom sheet state management
  const bottomSheetRef = useRef(null);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedKelasKata, setSelectedKelasKata] = useState(null);

  const handleTagPress = useCallback((tag, tagIndex, kelasKataItem) => {
    setSelectedTag(tag);
    setSelectedKelasKata(kelasKataItem);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================
  const renderHeader = useCallback(
    () => (
      <>
        <WordOverviewCard
          word={wordDetail.word}
          entry={wordDetail.entries[0]}
        />
      </>
    ),
    [wordDetail.word, wordDetail.entries],
  );

  const renderFooter = useCallback(
    () => (
      <>
        {/* <PeribahasaCard entry={wordDetail.entries[0]} /> */}
        <PeribahasaWithMeaningCard entry={wordDetail.entries[0]} />
      </>
    ),
    [wordDetail.entries],
  );

  const renderDefinitionItem = useCallback(
    ({item, index}) => (
      <DefinitionCard
        entry={item}
        isMultiple={wordDetail.entries.length > 1}
        index={index}
        onTagPress={handleTagPress}
      />
    ),
    [wordDetail.entries.length, handleTagPress],
  );

  const renderEmptyComponent = () => (
    <Text style={styles.emptyText}>Tidak ada hasil ditemukan.</Text>
  );

  // =============================================================================
  // LOADING STATE
  // =============================================================================
  if (wordDetail.entries.length === 0) {
    return (
      <View style={styles.outerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <SafeAreaView style={styles.header} edges={['top']}>
          <BackButton onPress={() => navigation.goBack()} />
        </SafeAreaView>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <Gap height={10} />
          <SkeletonLoader />
        </SafeAreaView>
        <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
      </View>
    );
  }

  // =============================================================================
  // MAIN RENDER
  // =============================================================================
  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {/* The back bar lives outside the list, so it stays fixed while the
          content scrolls without an absolutely positioned overlay. That
          overlay used to cover the top of the list, which forced a large
          grey reservation that varied with the status bar height. */}
      <SafeAreaView style={styles.header} edges={['top']}>
        <BackButton onPress={() => navigation.goBack()} />
      </SafeAreaView>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <FlatList
          data={wordDetail.entries}
          keyExtractor={(item, idx) => item.id || idx.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          renderItem={renderDefinitionItem}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        {/* Pinned below the list, so it stays in the viewport on long entries
            without covering the content or sitting at the top of the screen. */}
        <NativeAdCard />
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />

      <KelasKataBottomSheet
        ref={bottomSheetRef}
        selectedTag={selectedTag}
        selectedKelasKata={selectedKelasKata}
        getInfoByCodeAndType={getInfoByCodeAndType}
        kelasKataLoading={kelasKataData.loading}
        bahasaLoading={bahasaData.loading}
      />
    </View>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles = StyleSheet.create({
  // LAYOUT CONTAINERS
  outerContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.page,
  },
  bottomSafeArea: {
    backgroundColor: colors.white,
  },
  listContent: {
    // The first card brings its own marginTop, which already reads as the gap
    // under the back bar. Anything more here was pure grey band.
    paddingBottom: 20,
  },

  // EMPTY STATE
  emptyText: {
    color: 'grey',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: fonts.primary[600],
  },
});
