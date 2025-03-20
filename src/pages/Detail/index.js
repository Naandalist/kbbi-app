import React from 'react';
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

export default function Detail({route, navigation}) {
  const {pressedWord, selectedLetter} = route.params;

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButtonContainer}>
            <View style={styles.arrowContainer}>
              <IconExit />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView>
        {dataDummy.data.map((item, index) => (
          <View key={index} style={styles.cardSection}>
            <View style={styles.bodySection}>
              <View style={styles.infoSection}>
                <View style={styles.wrapperLabelText}>
                  <Text style={styles.labelText}>{`Kata dasar`}</Text>
                  <Text style={styles.exponentText}>{` ${index + 1}`}</Text>
                </View>
                <Text style={[styles.contentText, styles.boldText]}>
                  {sanitizeText(item.lema)}
                </Text>
              </View>

              {item.arti.map((arti, index) => (
                <View key={index} style={styles.meaningContainer}>
                  <Text style={styles.indexText}>{index + 1}. </Text>
                  <View>
                    <Text style={styles.partOfSpeechText}>
                      {arti.kelas_kata}{' '}
                    </Text>
                    <Gap height={3} />
                    <Text style={styles.descriptionText}>
                      {arti.deskripsi}{' '}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Gap height={20} />

        <View style={styles.cardSection}>
          <View style={styles.bodySection}>
            <View style={styles.infoSection}>
              <Text style={styles.labelText}>
                {`Hasil studi penelusuran asal-usul kata\nsecara etimologi`}
              </Text>
            </View>

            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>1. </Text>
              <View>
                <Text style={styles.partOfSpeechText}>
                  Sumber bahasa asalnya
                </Text>
                <Gap height={3} />
                <Text style={styles.descriptionText}>
                  {dataDummy.etimologi.bahasaAsal}{' '}
                </Text>
              </View>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>2. </Text>
              <View>
                <Text style={styles.partOfSpeechText}>
                  Arti, makna, atau terjemahnya
                </Text>
                <Gap height={3} />
                <Text style={styles.descriptionText}>
                  {dataDummy.etimologi.arti}{' '}
                </Text>
              </View>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>3. </Text>
              <View>
                <Text style={styles.partOfSpeechText}>
                  Kata asal dari bahasa aslinya
                </Text>
                <Gap height={3} />
                <Text style={styles.descriptionText}>
                  {dataDummy.etimologi.kataAsal}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.cardSection}>
          <View style={styles.bodySection}>
            <View style={styles.infoSection}></View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>• </Text>
              <View>
                <Text style={styles.partOfSpeechText}>Istilah</Text>
                <Gap height={3} />
                <Text style={styles.descriptionText}>{dataDummy.istilah} </Text>
              </View>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>• </Text>
              <View>
                <Text style={styles.partOfSpeechText}>Entri</Text>
                <Gap height={3} />
                <Text style={styles.descriptionText}>{dataDummy.entri} </Text>
              </View>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>• </Text>
              <View>
                <Text style={styles.partOfSpeechText}>Bentuk tidak baku</Text>
                <Gap height={3} />
                <Text style={styles.descriptionText}>
                  {dataDummy.bentukTidakBaku}{' '}
                </Text>
              </View>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>• </Text>
              <View>
                <Text style={styles.partOfSpeechText}>Peribahasa</Text>
                <Gap height={3} />
                {dataDummy.peribahasa.map((text, index) => {
                  return (
                    <Text key={index} style={styles.descriptionText}>
                      {index + 1}. {text}.
                    </Text>
                  );
                })}
              </View>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>• </Text>
              <View>
                <Text style={styles.partOfSpeechText}>Kata turunan</Text>
                <Gap height={3} />
                {dataDummy.kataTurunan.map((text, index) => {
                  return (
                    <Text key={index} style={styles.descriptionText}>
                      {index + 1}. {text}.
                    </Text>
                  );
                })}
              </View>
            </View>
            <View style={styles.meaningContainer}>
              <Text style={styles.indexText}>• </Text>
              <View>
                <Text style={styles.partOfSpeechText}>Gabungan Kata</Text>
                <Gap height={3} />
                {dataDummy.gabunganKata.map((text, index) => {
                  return (
                    <Text key={index} style={styles.descriptionText}>
                      {index + 1}. {text}.
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
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
