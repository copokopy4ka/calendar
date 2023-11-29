import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useInitialConfigurations } from 'shared/hooks/useInitialConfigurations';
import './style.scss';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  useInitialConfigurations();
  return <div className={clsx('main-layout')}>{children}</div>;
};
