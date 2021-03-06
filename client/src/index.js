import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';
import './index.css';
import { persistor, store } from './store';
import { SocketContext, socket } from './context/socket';

ReactDOM.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </SocketContext.Provider>
  </Provider>,
  document.getElementById('root'),
);
