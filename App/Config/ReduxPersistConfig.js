import storage from 'redux-persist/lib/storage';
import immutablePersistenceTransform from '../Transforms/ImmutablePersistenceTransform';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    key: 'ml:',
    storage,
    debounce: 500,
    blacklist: [
      'basicInfo',
    ], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['form', 'dashboard'], // Optionally, just specify the keys you DO want stored to
    transforms: [immutablePersistenceTransform]
  }
};

export default REDUX_PERSIST;
