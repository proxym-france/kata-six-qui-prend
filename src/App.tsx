import React, { useEffect, useState } from 'react'
import './App.css'
import { Game } from './model/game'
import { Player } from './model/player'
import { type Row } from './model/row'

const game = new Game()
game.addPlayer(new Player('p1'))
game.addPlayer(new Player('p2'))

game.start()

function App (): React.JSX.Element {
  const [rows, setRows] = useState(new Array<Row>())

  useEffect(() => {
    setRows(game.board.getRows())
  }, [])

  function playCard (): void {
    const currentPlayer = game.currentPlayer
    currentPlayer?.playCard(currentPlayer?.highestCard?.number)
    setRows([...game.board.getRows()])
  }

  const first = rows[0]?.cards.map(c => (<span key={c.number}>{c.number} </span>))
  const second = rows[1]?.cards.map(c => (<span key={c.number}>{c.number} </span>))
  const third = rows[2]?.cards.map(c => (<span key={c.number}>{c.number} </span>))
  const fourth = rows[3]?.cards.map(c => (<span key={c.number}>{c.number} </span>))

  return (
    <div className="App">
      {first}
      {<br/>}
      {second}
      {<br/>}
      {third}
      {<br/>}
      {fourth}
      {<br/>}
      {<br/>}
      {game.currentPlayer?.hand.map(c => (<span key={c.number}>{c.number} </span>))}
      <br/>
      <div>
        <div>current player</div>
        {game.currentPlayer?.name}
        <div>points</div>
        {game.currentPlayer?.points}
        <div>highest card</div>
        {game.currentPlayer?.highestCard?.number}
      </div>
      <button onClick={playCard}>play card</button>
    </div>
  )
}

export default App
