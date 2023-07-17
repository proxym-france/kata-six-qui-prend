import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Game } from './model/game';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const game = new Game();

root.render(
  <React.StrictMode>
    <App game={game} />
  </React.StrictMode>
);
