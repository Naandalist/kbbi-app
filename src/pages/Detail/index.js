import React, {useEffect, useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getData,
  showError,
  removeSuperscriptDigits,
  colors,
  fonts,
} from '../../utils';
import {Gap} from '../../components';
import SkeletonLoader from './SkeletonLoader';
import {SafeAreaView} from 'react-native-safe-area-context';

const initialData = {
  word: '',
  authenticated: false,
  entries: [],
};

const BackButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.backButton}>
    <Icon name="close-outline" size={30} color="black" />
  </TouchableOpacity>
);

const InfoRow = ({label, text, tags, exponent, hasBorder}) => (
  <View style={[styles.infoRow, hasBorder && styles.dashedBorder]}>
    <View style={styles.rowHeader}>
      <Text style={styles.label}>{label}</Text>
      {exponent != null && <Text style={styles.exponent}>{exponent}</Text>}
    </View>
    {text && (
      <Text style={[styles.content, styles.boldText]}>
        {removeSuperscriptDigits(text)}
      </Text>
    )}
    {tags && (
      <View style={styles.tagsContainer}>
        {tags.map((tag, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
);
InfoRow.defaultProps = {
  text: null,
  tags: null,
  exponent: null,
  hasBorder: false,
};

const ExampleList = ({list}) => (
  <View style={styles.exampleContainer}>
    <Text style={styles.exampleLabel}>contoh</Text>
    {list.map((ex, i) => (
      <Text key={i} style={styles.exampleTextList}>
        • {removeSuperscriptDigits(ex.teks)}
      </Text>
    ))}
  </View>
);

const DefinitionItem = ({meaning, displayExponent}) => {
  const examples = meaning.contoh.filter(ex => ex.teks?.length > 0);
  return (
    <View style={styles.definitionContainer}>
      <InfoRow
        label="definisi"
        text={meaning.definisi}
        exponent={displayExponent ? meaning.nomor : null}
      />
      {examples.length > 0 && <ExampleList list={examples} />}
    </View>
  );
};

const PeribahasaItem = ({list}) => (
  <View style={styles.peribahasaContainer}>
    <Text style={styles.peribahasaLabel}>peribahasa</Text>
    {list.map((item, i) => (
      <Text key={i} style={styles.peribahasaText}>
        • {item}
      </Text>
    ))}
  </View>
);

const EntryCard = ({entry, isMultiple, index}) => {
  const exponent = isMultiple ? index + 1 : null;
  const posTags = entry.makna[0]?.kelasKata?.map(
    ({kode, nama}) => `${kode} ${nama}`,
  );
  return (
    <View style={styles.card}>
      {posTags?.length > 0 && (
        <InfoRow
          label="kelas kata"
          tags={posTags}
          exponent={exponent}
          hasBorder
        />
      )}
      {entry.makna.map(m => (
        <DefinitionItem
          key={m.nomor || m.definisi}
          meaning={m}
          displayExponent={entry.makna.length > 1}
        />
      ))}
      {entry.terkait?.peribahasa?.length > 0 && (
        <PeribahasaItem list={entry.terkait.peribahasa} />
      )}
    </View>
  );
};
EntryCard.defaultProps = {
  isMultiple: false,
};

const WordOverview = ({word, entry}) => (
  <View style={styles.card}>
    <InfoRow label="kata dasar" text={word} />
    {entry.nama && entry.nama !== word && (
      <InfoRow label="ejaan" text={entry.nama} />
    )}
    {entry.rootWord && <InfoRow label="akar kata" text={entry.rootWord} />}
    {entry.terkait?.kataTurunan?.length > 0 && (
      <InfoRow
        label="kata turunan"
        tags={entry.terkait.kataTurunan}
        hasBorder
      />
    )}
    {entry.terkait?.gabunganKata?.length > 0 && (
      <InfoRow
        label="kata gabungan"
        tags={entry.terkait.gabunganKata}
        hasBorder
      />
    )}
  </View>
);

export default function Detail({route, navigation}) {
  const {pressedWord, selectedLetter} = route.params;
  const [wordDetail, setWordDetail] = useState(initialData);

  const fetchWord = useCallback(async () => {
    try {
      const res = await getData(selectedLetter, pressedWord);
      if (res.error) {
        showError('Kata yang dicari tidak ditemukan.');
      } else if (res.message === 'Fetch Success') {
        setWordDetail(res.data);
      }
    } catch (err) {
      showError('Terjadi kesalahan saat mengambil data.');
      console.error(err);
    }
  }, [pressedWord, selectedLetter]);

  useEffect(() => {
    fetchWord();
  }, [fetchWord]);

  if (!wordDetail.authenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Gap height={10} />
        <SkeletonLoader />
      </SafeAreaView>
    );
  }

  const {word, entries} = wordDetail;
  const multiple = entries.length > 1;

  const renderHeader = () => (
    <>
      <BackButton onPress={() => navigation.goBack()} />
      <WordOverview word={word} entry={entries[0]} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item, idx) => item.id || idx.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({item, index}) => (
          <EntryCard entry={item} isMultiple={multiple} index={index} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada hasil ditemukan.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.page,
  },
  backButton: {
    padding: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.page,
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 10,
  },
  infoRow: {
    marginBottom: 10,
  },
  dashedBorder: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderBottomColor: 'grey',
    paddingBottom: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    color: 'rgba(30, 39, 46,0.7)',
    fontFamily: fonts.primary[600],
  },
  exponent: {
    fontSize: 10,
    lineHeight: 18,
    color: 'rgba(30, 39, 46,0.7)',
    fontFamily: fonts.primary[600],
    marginLeft: 4,
  },
  content: {
    color: 'black',
    fontFamily: fonts.primary[700],
    marginTop: 4,
  },
  boldText: {
    fontFamily: fonts.primary[700],
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#e4eff9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontFamily: fonts.primary_italic[400],
    color: 'rgba(30, 39, 46,0.7)',
  },
  definitionContainer: {
    marginTop: 10,
  },
  exampleContainer: {
    marginBottom: 20,
  },
  exampleLabel: {
    fontFamily: fonts.primary[600],
    color: 'rgba(30, 39, 46,0.7)',
  },
  exampleTextList: {
    marginTop: 4,
    marginLeft: 8,
    fontFamily: fonts.primary[400],
    color: 'black',
  },
  peribahasaContainer: {
    marginTop: 10,
  },
  peribahasaLabel: {
    fontFamily: fonts.primary[600],
    color: 'rgba(30, 39, 46,0.7)',
  },
  peribahasaText: {
    marginTop: 4,
    fontFamily: fonts.primary[400],
    color: 'black',
    marginLeft: 8,
  },
  emptyText: {
    color: 'grey',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: fonts.primary[600],
  },
  listContent: {
    paddingBottom: 20,
  },
});
