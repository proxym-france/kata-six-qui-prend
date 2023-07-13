import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Game } from './model/game'
import { Player } from './model/player'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const game = new Game()
game.addPlayer(new Player('p1'))
game.addPlayer(new Player('p2'))
game.start()

root.render(
  <React.StrictMode>
    <App game={game}/>
  </React.StrictMode>
)
