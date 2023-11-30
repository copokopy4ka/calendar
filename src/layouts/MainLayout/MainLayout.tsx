import { FC, PropsWithChildren, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useInitialConfigurations } from 'shared/hooks/useInitialConfigurations';
import { MainLayoutContext } from './MainLayout.context';
import './style.scss';
import { LoadingIndicator } from 'components/LoadingIndicator/LoadingIndicator';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isUsingLocalStorage, setIsUsingLocalStorage] = useState(true);
  const isLoading = useInitialConfigurations(isUsingLocalStorage);

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
      <LoadingIndicator isLoading={isLoading} />
    </MainLayoutContext.Provider>
  );
};
