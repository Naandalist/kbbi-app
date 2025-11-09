import {Rozenite} from '@rozenite/middleware';

let rozenite;

if (__DEV__) {
  rozenite = new Rozenite({
    name: 'KBBI VI',
  });

  // Make it globally available for debugging
  console.rozenite = rozenite;

  console.log('Rozenite Configured');
} else {
  // Stub for production
  console.rozenite = {
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

export default rozenite;
