import {Platform} from 'react-native';
import mobileAds, {
  AdsConsent,
  NativeAd,
  NativeMediaAspectRatio,
  TestIds,
} from 'react-native-google-mobile-ads';

/**
 * Ads are Android-only. On iOS the native SDK needs an app ID in Info.plist
 * that this project does not ship, so keep every ad path inert there.
 * Set SHOW_ADS=false in .env to hide ads on Android too.
 */
export const showAds =
  Platform.OS === 'android' && process.env.SHOW_ADS !== 'false';

const configuredNativeUnitId = process.env.ADMOB_NATIVE_UNIT_ID;

/**
 * Test units in development so the slot can actually render. A release build
 * with no configured unit would otherwise ship Google's sample unit, which
 * earns nothing, so fall back to the sample unit only when there is no choice.
 */
export const nativeAdUnitId =
  __DEV__ || !configuredNativeUnitId ? TestIds.NATIVE : configuredNativeUnitId;

let ready;

/** Consent first, then one SDK init. Ads stay blocked until this resolves true. */
export function mobileAdsReady() {
  ready ??= (async () => {
    if (!showAds) {
      return false;
    }
    let canRequestAds = false;
    try {
      canRequestAds = (await AdsConsent.gatherConsent()).canRequestAds;
    } catch {
      // A new AdMob app has no privacy form yet. That rejects consent, but
      // ads are still allowed where a form is not required.
      try {
        canRequestAds = (await AdsConsent.getConsentInfo()).canRequestAds;
      } catch {
        canRequestAds = true;
      }
    }
    if (!canRequestAds) {
      return false;
    }
    try {
      await mobileAds().initialize();
      return true;
    } catch {
      return false;
    }
  })();
  return ready;
}

export function startMobileAds() {
  if (!showAds) {
    return;
  }
  // Never rejects: every branch inside mobileAdsReady resolves to a boolean.
  mobileAdsReady();
}

export function createNativeAd() {
  return NativeAd.createForAdRequest(nativeAdUnitId, {
    aspectRatio: NativeMediaAspectRatio.LANDSCAPE,
    startVideoMuted: true,
  });
}
