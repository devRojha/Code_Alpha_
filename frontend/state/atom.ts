// state/atoms.ts
import { atom } from 'recoil';

export const logedinState = atom<boolean>({
  key: 'logedinState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const adminState = atom<boolean>({
    key: 'adminState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });
