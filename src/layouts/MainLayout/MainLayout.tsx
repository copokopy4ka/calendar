import { FC, PropsWithChildren, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useInitialConfigurations } from 'shared/hooks/useInitialConfigurations';
import { MainLayoutContext } from './MainLayout.context';
import './style.scss';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	const [isUsingLocalStorage, setIsUsingLocalStorage] = useState(true);
  useInitialConfigurations(isUsingLocalStorage);

  const mainLayoutContext = useMemo(
    () => ({
      isUsingLocalStorage,
      setIsUsingLocalStorage,
    }),
    [isUsingLocalStorage]
  );

  return (
    <MainLayoutContext.Provider value={mainLayoutContext}>
      <div className={clsx('main-layout')}>{children}</div>
    </MainLayoutContext.Provider>
  );
};
