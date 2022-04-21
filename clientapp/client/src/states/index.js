import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    selectedPunk: null
});

export { useGlobalState, setGlobalState };