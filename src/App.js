import React from "react";
import logo from "./logo.svg";
import "./App.css";
import useTranslation from "./modules/i18n";
import Header from "./Header";

function App() {
  const { t } = useTranslation("common");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Header title="lola" />
      </header>
    </div>
  );
}

export default App;
