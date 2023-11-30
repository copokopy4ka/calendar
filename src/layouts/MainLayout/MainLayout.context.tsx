import { Dispatch, createContext } from 'react';

const mainLayoutContextDefaultValues = {
  isUsingLocalStorage: true,
  setIsUsingLocalStorage: (): null => null,
};

export interface IMainLayoutContext {
  isUsingLocalStorage: boolean;
  setIsUsingLocalStorage: Dispatch<React.SetStateAction<boolean>>;
}

export const MainLayoutContext = createContext<IMainLayoutContext>(mainLayoutContextDefaultValues);
