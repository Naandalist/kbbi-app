import React, {forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {fonts} from '../../../utils';
import {FONT_SIZES} from '../../../constants';

const KelasKataBottomSheet = forwardRef(
  (
    {
      selectedTag,
      selectedKelasKata,
      getInfoByCodeAndType,
      kelasKataLoading,
      bahasaLoading,
      kategoriLoading,
      lainnyaLoading,
      bidangSubjekLoading,
    },
    ref,
  ) => {
    const snapPoints = ['70%', '40%'];

    const renderBackdrop = props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    );

    // Get the info data based on the selected tag and type from the API
    const infoData =
      selectedKelasKata && selectedKelasKata.tipe && getInfoByCodeAndType
        ? getInfoByCodeAndType(selectedTag, selectedKelasKata.tipe)
        : null;

    const isKelasKata = selectedKelasKata?.tipe === 'kelas_kata';
    const isBahasa = selectedKelasKata?.tipe === 'bahasa';
    const isKategori = selectedKelasKata?.tipe === 'kategori';
    const isLainnya = selectedKelasKata?.tipe === 'lainnya';
    const isBidangSubjek = selectedKelasKata?.tipe === 'bidang_subjek';

    // Check if we're still loading the relevant data
    const isStillLoading =
      (isKelasKata && kelasKataLoading) ||
      (isBahasa && bahasaLoading) ||
      (isKategori && kategoriLoading) ||
      (isLainnya && lainnyaLoading) ||
      (isBidangSubjek && bidangSubjekLoading);

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={-1}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {infoData?.nama || selectedKelasKata?.nama || selectedTag}
            </Text>
          </View>

          <View style={styles.content}>
            {infoData ? (
              <>
                <Text style={styles.sectionTitle}>Definisi</Text>
                <Text style={styles.description}>{infoData.description}</Text>

                <Text style={styles.sectionTitle}>Penjelasan</Text>
                <Text style={styles.description}>
                  {infoData.full_description}
                </Text>

                {isBahasa && infoData.type && (
                  <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>Tipe:</Text>
                    <Text style={styles.infoValue}>
                      {infoData.type.replace('_', ' ')}
                    </Text>
                  </View>
                )}
              </>
            ) : isStillLoading ? (
              <>
                <Text style={styles.sectionTitle}>Memuat Data...</Text>
                <Text style={styles.description}>
                  Sedang mengambil informasi{' '}
                  {isKelasKata
                    ? 'kelas kata'
                    : isBahasa
                    ? 'bahasa'
                    : isKategori
                    ? 'kategori'
                    : isLainnya
                    ? 'lainnya'
                    : isBidangSubjek
                    ? 'bidang subjek'
                    : ''}{' '}
                  untuk "{selectedTag}".
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Data Tidak Ditemukan</Text>
                <Text style={styles.description}>
                  Informasi{' '}
                  {isKelasKata
                    ? 'kelas kata'
                    : isBahasa
                    ? 'bahasa'
                    : isKategori
                    ? 'kategori'
                    : isLainnya
                    ? 'lainnya'
                    : isBidangSubjek
                    ? 'bidang subjek'
                    : ''}{' '}
                  untuk "{selectedTag}" tidak tersedia.
                </Text>
              </>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handleIndicator: {
    backgroundColor: '#e0e0e0',
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 16,
  },
  title: {
    fontSize: FONT_SIZES['2XL'],
    fontFamily: fonts.primary[700],
    color: '#2c3e50',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.L,
    fontFamily: fonts.primary[600],
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 16,
  },
  description: {
    fontSize: FONT_SIZES.M,
    fontFamily: fonts.primary[400],
    color: '#5a6c7d',
    lineHeight: 22,
    textAlign: 'justify',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: FONT_SIZES.M,
    fontFamily: fonts.primary[600],
    color: '#2c3e50',
  },
  infoValue: {
    fontSize: FONT_SIZES.M,
    fontFamily: fonts.primary[500],
    color: '#3498db',
    textTransform: 'uppercase',
  },
});

export default KelasKataBottomSheet;
