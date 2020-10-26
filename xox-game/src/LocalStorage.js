export function readFromStorage(key) {
    if (typeof localStorage !== 'undefined') {
        console.log(`Reading ${key} from local storage`);
        // Code for localStorage/sessionStorage.
        return JSON.parse(localStorage.getItem(key));
    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant read local storage!');
    }
}

export function writeToStorage(key, value) {
    if (typeof localStorage !== 'undefined') {
        // Code for localStorage/sessionStorage.
        return localStorage.setItem(key, JSON.stringify(value));
    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant write to local storage!');
    }
}