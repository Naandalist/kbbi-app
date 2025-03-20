import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {dataDummy} from './data';
import {colors, fonts} from '../../utils';
import {IconExit} from '../../assets';
import {Gap} from '../../components';
import {removeTrailingDigits as sanitizeText} from '../../utils';

// Header Component
const Header = ({onPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.backButtonContainer}>
          <View style={styles.arrowContainer}>
            <IconExit />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Card Section Component
const CardSection = ({children}) => {
  return (
    <View style={styles.cardSection}>
      <View style={styles.bodySection}>{children}</View>
    </View>
  );
};

// Info Section Component
const InfoSection = ({label, exponent, content}) => {
  return (
    <View style={styles.infoSection}>
      {label && (
        <View style={styles.wrapperLabelText}>
          <Text style={styles.labelText}>{label}</Text>
          {exponent && (
            <Text style={styles.exponentText}>{` ${exponent}`}</Text>
          )}
        </View>
      )}
      {content && (
        <Text style={[styles.contentText, styles.boldText]}>{content}</Text>
      )}
    </View>
  );
};

// Meaning Item Component
const MeaningItem = ({index, partOfSpeech, description, etimo}) => {
  return (
    <View style={styles.meaningContainer}>
      <Text style={styles.indexText}>{index}. </Text>
      <View>
        {etimo ? (
          <>
            <Text style={styles.partOfSpeechText}>{partOfSpeech} </Text>
            <Gap height={3} />
            <Text style={styles.descriptionText}>{description} </Text>
          </>
        ) : (
          <>
            <Text style={styles.descriptionText}>{description} </Text>
            <Gap height={3} />
            <Text style={styles.partOfSpeechText}>{partOfSpeech} </Text>
          </>
        )}
      </View>
    </View>
  );
};

// Bullet Item Component
const BulletItem = ({title, content, isArray = false}) => {
  return (
    <View style={styles.meaningContainer}>
      <Text style={styles.indexText}>- </Text>
      <View>
        <Text style={styles.partOfSpeechText}>{title}</Text>
        <Gap height={3} />
        {isArray && content.length > 1 ? (
          content.map((text, index) => (
            <Text key={index} style={styles.descriptionText}>
              {index + 1}. {text}.
            </Text>
          ))
        ) : (
          <Text style={styles.descriptionText}>{content} </Text>
        )}
      </View>
    </View>
  );
};

// Main Detail Component
export default function Detail({route, navigation}) {
  const [wordDetail, setWordDetail] = useState(dataDummy);
  const [showMore, setShowMore] = useState(false);

  const {pressedWord, selectedLetter} = route.params;

  const isEtimologyExist = () => {
    return (
      wordDetail?.etimologi?.bahasaAsal !== '' &&
      wordDetail?.etimologi?.arti !== '' &&
      wordDetail?.etimologi?.kataAsal !== ''
    );
  };

  const isDataEmpty = data => {
    return data.length < 1;
  };

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} />

      <ScrollView>
        {!isDataEmpty(wordDetail.data) &&
          wordDetail.data.map((item, index) => (
            <CardSection key={index}>
              <InfoSection
                label="Kata dasar"
                exponent={index + 1}
                content={sanitizeText(item.lema)}
              />

              {item.arti.map((arti, index) => (
                <MeaningItem
                  key={index}
                  index={index + 1}
                  partOfSpeech={arti.kelas_kata}
                  description={arti.deskripsi}
                />
              ))}
            </CardSection>
          ))}

        {/* <Gap height={20} /> */}

        {/* Etymology section */}

        {isEtimologyExist() && (
          <CardSection>
            <InfoSection
              label={`Hasil studi penelusuran asal-usul kata\nsecara etimologi`}
            />
            <MeaningItem
              index="1"
              partOfSpeech="Sumber bahasa asalnya"
              description={wordDetail.etimologi.bahasaAsal}
              etimo={true}
            />
            <MeaningItem
              index="2"
              partOfSpeech="Arti, makna, atau terjemahnya"
              description={wordDetail.etimologi.arti}
              etimo={true}
            />
            <MeaningItem
              index="3"
              partOfSpeech="Kata asal dari bahasa aslinya"
              description={wordDetail.etimologi.kataAsal}
              etimo={true}
            />
          </CardSection>
        )}

        {/* Additional information section */}
        {showMore && (
          <CardSection>
            <InfoSection />

            {!isDataEmpty(wordDetail.istilah) && (
              <BulletItem title="Istilah" content={wordDetail.istilah} />
            )}

            {!isDataEmpty(wordDetail.entri) && (
              <BulletItem
                title="Entri"
                content={sanitizeText(wordDetail.entri)}
              />
            )}

            {!isDataEmpty(wordDetail.bentukTidakBaku) && (
              <BulletItem
                title="Bentuk tidak baku"
                content={sanitizeText(wordDetail.bentukTidakBaku)}
              />
            )}

            {!isDataEmpty(wordDetail?.peribahasa) && (
              <BulletItem
                title="Peribahasa"
                content={wordDetail.peribahasa}
                isArray
              />
            )}

            {!isDataEmpty(wordDetail?.kataTurunan) && (
              <BulletItem
                title="Kata turunan"
                content={wordDetail.kataTurunan}
                isArray
              />
            )}

            {!isDataEmpty(wordDetail?.gabunganKata) && (
              <BulletItem
                title="Gabungan Kata "
                content={wordDetail.gabunganKata}
                isArray
              />
            )}
          </CardSection>
        )}

        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text
            style={{color: 'black', textAlign: 'center', marginVertical: 20}}>
            {`Tampilkan Lebih ${showMore ? 'Sedikit' : 'Banyak'}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Layout styles
  page: {
    flex: 1,
    backgroundColor: colors.page,
  },
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.page,
  },
  cardSection: {
    backgroundColor: '#FFF',
    paddingBottom: 20,
    marginTop: 10,
  },
  bodySection: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  // Back button styles
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  backText: {
    color: 'black',
    fontFamily: fonts.primary[600],
    fontSize: 18,
  },

  // Word info styles
  infoSection: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dashed',
    paddingBottom: 10,
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
    fontSize: 18,
    fontFamily: fonts.primary[600],
  },
  boldText: {
    fontFamily: fonts.primary[700],
  },

  // Definition styles
  meaningContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  indexText: {
    fontFamily: fonts.primary_italic[400],
    fontStyle: 'italic',
    color: 'rgba(30, 39, 46,0.7)',
  },
  partOfSpeechText: {
    fontFamily: fonts.primary_italic[400],
    color: 'rgba(30, 39, 46,0.7)',
  },
  descriptionText: {
    fontFamily: fonts.primary[700],
    color: 'black',
  },
});
