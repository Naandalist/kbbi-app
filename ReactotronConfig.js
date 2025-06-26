import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({
    name: 'KBBI VI',
  })
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate|127.0.0.1/,
      },
    })

    .connect();

  console.tron = tron;

  tron.clear();

  console.log('Reactotron Configured');
} else {
  console.tron = {
    log: () => {},
    warn: () => {},
    error: () => {},
    display: () => {},
    image: () => {},
  };
}

const reactotron = console.tron;
export default reactotron;
