import {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  NativeAdView,
  NativeAsset,
  NativeAssetType,
} from 'react-native-google-mobile-ads';
import {colors, fonts} from '../../../utils';
import {FONT_SIZES} from '../../../constants';
import {createNativeAd, mobileAdsReady, showAds} from '../../../utils/ads';

/**
 * Pinned to the bottom of the detail screen, so it must stay short: a compact
 * row keeps the ad in the viewport without pushing the word content away.
 */
export default function NativeAdCard() {
  if (!showAds) {
    return null;
  }
  return <NativeAdCardLoaded />;
}

function NativeAdCardLoaded() {
  const [nativeAd, setNativeAd] = useState(null);

  useEffect(() => {
    let active = true;
    let loaded = null;

    async function load() {
      try {
        // Consent and SDK init are shared, so this resolves fast after the first.
        if (!(await mobileAdsReady()) || !active) {
          return;
        }
        const ad = await createNativeAd();
        if (active) {
          loaded = ad;
          setNativeAd(ad);
        } else {
          ad.destroy();
        }
      } catch {
        // Consent denied, no fill, no inventory yet, or offline: leave it empty.
      }
    }

    load();

    return () => {
      active = false;
      // Native ads are native objects, not JS state. Leaking them leaks a view.
      loaded?.destroy();
    };
  }, []);

  if (!nativeAd) {
    return null;
  }

  return (
    <View style={styles.card}>
      <NativeAdView nativeAd={nativeAd} style={styles.ad}>
        <View style={styles.identity}>
          {nativeAd.icon ? (
            <NativeAsset assetType={NativeAssetType.ICON}>
              <Image source={{uri: nativeAd.icon.url}} style={styles.icon} />
            </NativeAsset>
          ) : null}
          <View style={styles.copy}>
            <Text style={styles.attribution}>Iklan</Text>
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text numberOfLines={1} style={styles.headline}>
                {nativeAd.headline}
              </Text>
            </NativeAsset>
            {nativeAd.advertiser ? (
              <NativeAsset assetType={NativeAssetType.ADVERTISER}>
                <Text numberOfLines={1} style={styles.advertiser}>
                  {nativeAd.advertiser}
                </Text>
              </NativeAsset>
            ) : null}
          </View>
          {nativeAd.callToAction ? (
            <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
              <Text style={styles.action}>{nativeAd.callToAction}</Text>
            </NativeAsset>
          ) : null}
        </View>
      </NativeAdView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  ad: {
    gap: 6,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // Leaves room for the AdChoices badge top-right.
    paddingRight: 24,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.page,
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  attribution: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    fontFamily: fonts.primary[700],
    fontSize: FONT_SIZES.XS,
    letterSpacing: 0.5,
    color: colors.white,
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  headline: {
    fontFamily: fonts.primary[600],
    fontSize: FONT_SIZES.M,
    color: colors.text.primary,
  },
  advertiser: {
    fontFamily: fonts.primary[400],
    fontSize: FONT_SIZES.XS,
    color: colors.text.secondary,
  },
  action: {
    overflow: 'hidden',
    fontFamily: fonts.primary[600],
    fontSize: FONT_SIZES.S,
    color: colors.white,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
