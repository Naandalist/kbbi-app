import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  getData,
  showError,
  fonts,
  colors,
  removeSuperscriptDigits,
} from '../../utils';
import {Gap} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import SkeletonLoader from './SkeletonLoader';

const initialData = {
  word: '',
  authenticated: false,
  entries: [
    {
      id: '',
      nama: '',
      nomor: '',
      makna: [
        {
          nomor: '',
          kelasKata: [
            {
              kode: '',
              nama: '',
            },
          ],
          definisi: '',
          contoh: [],
        },
      ],
      terkait: {},
    },
  ],
};

const Header = ({onPress, pressedWord}) => (
  <View style={styles.header}>
    <View style={styles.backButtonContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.arrowContainer}>
          <Icon name="close-outline" size={30} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const CardSection = ({children}) => (
  <View style={styles.cardSection}>
    <View style={styles.bodySection}>{children}</View>
  </View>
);

const InfoSection = ({label, exponent, content, hasBorder}) => (
  <View style={[styles.infoSection, hasBorder && styles.dashedBorder]}>
    {label && (
      <View style={styles.wrapperLabelText}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.exponentText}>{exponent}</Text>
      </View>
    )}
    {content && typeof content === 'string' && (
      <Text selectable style={[styles.contentText, styles.boldText]}>
        {removeSuperscriptDigits(content)}
      </Text>
    )}

    {content && typeof content === 'object' && (
      <View>
        <Gap height={5} />
        <View style={styles.labelsContainer}>
          {content.kelasKata.map((kelas, i) => (
            <View key={i} style={styles.labelWrapper}>
              <Text
                style={
                  styles.partOfSpeechText
                }>{`${kelas.kode} ${kelas.nama}`}</Text>
            </View>
          ))}
        </View>
      </View>
    )}
  </View>
);

const MeaningItem = ({index, exponent, description, labels, examples}) => (
  <View style={styles.meaningContainer}>
    <View>
      <View style={styles.rowCenter}>
        <Text style={styles.labelText}>definisi </Text>
        <Text style={styles.exponentText}>{exponent}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
      {examples
        .filter(example => example.teks.length > 1)
        .map((example, i) => (
          <View key={i} style={styles.exampleWrapper}>
            {example.teks && (
              <View style={styles.exampleRow}>
                <Text style={styles.exampleText}>contoh </Text>
                <Icon
                  name="arrow-forward-outline"
                  size={13}
                  color="black"
                  style={styles.exampleIcon}
                />
                <Text style={styles.exampleText}>{`${example.teks}`}</Text>
              </View>
            )}
          </View>
        ))}
    </View>
  </View>
);

export default function Detail(props) {
  const {route, navigation} = props;
  const {pressedWord, selectedLetter} = route.params;

  const [wordDetail, setWordDetail] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(selectedLetter, pressedWord);
        if (response.error) {
          showError('Kata yang dicari tidak ditemukan dalam KBBI.');
        } else if (response.message === 'Fetch Success') {
          setWordDetail(response.data);
        }
      } catch (error) {
        showError('Terjadi kesalahan saat mengambil data dari KBBI.');
        console.error(error);
      }
    };

    fetchData();
  }, [pressedWord, selectedLetter]);

  if (wordDetail.authenticated === false) {
    return (
      <>
        <Header pressedWord={pressedWord} onPress={() => navigation.goBack()} />
        <SkeletonLoader />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <Header pressedWord={pressedWord} onPress={() => navigation.goBack()} />
      <ScrollView>
        <CardSection>
          <InfoSection label="kata dasar" content={wordDetail.word} />
          {wordDetail.entries[0]?.nama !== wordDetail.word && (
            <InfoSection
              label="ejaan"
              content={wordDetail.entries[0]?.nama || ''}
            />
          )}
          {wordDetail.entries[0]?.rootWord && (
            <InfoSection
              label="akar kata"
              content={wordDetail.entries[0]?.rootWord || ''}
            />
          )}
        </CardSection>
        {wordDetail.entries.length > 0 ? (
          wordDetail.entries.map((entry, idx) => (
            <CardSection key={entry.id || idx}>
              {entry.makna[0]?.kelasKata?.length > 0 && (
                <InfoSection
                  label="kelas kata"
                  exponent={wordDetail.entries.length > 1 ? idx + 1 : null}
                  content={entry.makna[0]}
                  hasBorder
                />
              )}

              {entry.makna.map((maknaObj, i) => (
                <MeaningItem
                  key={maknaObj.nomor || i}
                  index={maknaObj.nomor || i + 1}
                  exponent={wordDetail.entries.length > 1 ? idx + 1 : null}
                  labels={maknaObj.kelasKata}
                  description={maknaObj.definisi}
                  examples={maknaObj.contoh}
                />
              ))}
            </CardSection>
          ))
        ) : (
          <Text style={styles.emptyText}>Tidak ada hasil ditemukan.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.page,
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.page,
  },
  backButtonContainer: {
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  arrowContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  backText: {
    color: 'black',
    fontFamily: fonts.primary[600],
    fontSize: 18,
    marginLeft: 16,
  },
  cardSection: {
    backgroundColor: colors.white,
    paddingBottom: 10,
    marginTop: 10,
  },
  bodySection: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  dashedBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dashed',
    paddingBottom: 10,
  },
  infoSection: {
    marginBottom: 10,
  },
  wrapperLabelText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  labelText: {
    color: 'rgba(30, 39, 46,0.7)',
    fontFamily: fonts.primary[600],
  },
  exponentText: {
    fontSize: 10,
    lineHeight: 18,
    color: 'rgba(30, 39, 46,0.7)',
    fontFamily: fonts.primary[600],
  },
  contentText: {
    color: 'black',
    fontFamily: fonts.primary[700],
  },
  boldText: {
    fontFamily: fonts.primary[700],
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 5,
  },
  labelWrapper: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#e4eff9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 6,
  },
  partOfSpeechText: {
    fontFamily: fonts.primary_italic[400],
    color: 'rgba(30, 39, 46,0.7)',
  },
  meaningContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  descriptionText: {
    fontFamily: fonts.primary[700],
    color: 'black',
  },
  exampleWrapper: {
    marginTop: 8,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'start',
  },
  exampleIcon: {
    top: 4,
    marginRight: 5,
  },
  exampleText: {
    fontFamily: fonts.primary[400],
    color: 'black',
    maxWidth: '85%',
  },
  emptyText: {
    color: 'grey',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: fonts.primary[600],
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
