import React, { useEffect, useState } from 'react';
import { readFromStorage, writeToStorage } from './LocalStorage';

export function useLocalStorageState(initialStateValue, storageKey) {
    let [state, setState] = useState(() => {
        const dataFromStore = readFromStorage(storageKey);
        return dataFromStore || initialStateValue;
    });

    function setPersistedState(value) {
        writeToStorage(storageKey, value);
        setState(value);
    }

    return [state, setPersistedState];
}