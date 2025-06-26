import {View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SkeletonPlaceholder
          borderRadius={4}
          backgroundColor="#E1E9EE"
          highlightColor="#F2F8FC">
          <SkeletonPlaceholder.Item>
            {/* First content block */}
            <SkeletonPlaceholder.Item marginBottom={35}>
              <SkeletonPlaceholder.Item width={120} height={20} />
              <SkeletonPlaceholder.Item width={220} height={20} marginTop={6} />
            </SkeletonPlaceholder.Item>

            {/* Second content block */}
            <SkeletonPlaceholder.Item marginBottom={35}>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={180} height={20} marginTop={6} />
            </SkeletonPlaceholder.Item>

            {/* Third content block (longer definition) */}
            <SkeletonPlaceholder.Item marginBottom={35}>
              <SkeletonPlaceholder.Item width={100} height={20} />
              <SkeletonPlaceholder.Item width="90%" height={20} marginTop={8} />
              <SkeletonPlaceholder.Item width="80%" height={20} marginTop={6} />
              <SkeletonPlaceholder.Item width="85%" height={20} marginTop={6} />
            </SkeletonPlaceholder.Item>

            {/* Fourth content block */}
            <SkeletonPlaceholder.Item marginBottom={35}>
              <SkeletonPlaceholder.Item width={100} height={20} />
              <SkeletonPlaceholder.Item width="70%" height={20} marginTop={6} />
            </SkeletonPlaceholder.Item>

            {/* Fifth content block */}
            <SkeletonPlaceholder.Item marginBottom={35}>
              <SkeletonPlaceholder.Item width={100} height={20} />
              <SkeletonPlaceholder.Item width="80%" height={20} marginTop={6} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    </SafeAreaView>
  );
};

export default SkeletonLoader;

// Styles for the component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
