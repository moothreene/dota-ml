import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Heroes from './Heroes';
import Header from './Header';
import reportWebVitals from './reportWebVitals';


if (document.title != "Dota Pick Predictor") {
  document.title = "Dota Pick Predictor";
}
function setFavicons(favImg){
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel','shortcut icon');
  setFavicon.setAttribute('href',favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons(require(`./images/logo.png`));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Heroes />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
