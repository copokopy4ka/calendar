import ReactDOM from 'react-dom/client';
import { store } from 'store/root-store';
import { Provider } from 'react-redux';
import App from './App';
import 'shared/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
