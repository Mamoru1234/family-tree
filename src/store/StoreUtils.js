import { createStore } from 'redux';

import FamilyTreeReducer from './module/FamilyTree';

const devToolsOptions = {
  actionSanitizer: (action) => {
    const type = action.type.toString();
    return { ...action, type };
  },
};

export function createAppStore() {
  return createStore(
    FamilyTreeReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(devToolsOptions)
  );
}
