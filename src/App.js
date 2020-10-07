import React from 'react';
import logo from './logo.svg';
import './App.css';
import useTranslation from './modules/i18n';


function App() {
  const {t} = useTranslation('common');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>{t('header', {title: 'world'})}</h1>
      </header>
    </div>
  );
}

export default App;
