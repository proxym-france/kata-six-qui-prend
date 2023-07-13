import React, { useState } from 'react'
import './App.css'
import { HandComponent, type SelectableCard } from './components/hand.component'
import { type Game } from './model/game'
import { type Card } from './model/card'
import { type Player } from './model/player'
import { type Row } from './model/row'
import { BoardComponent } from './components/board.component'

interface AppState {
  rows: Row[];
  currentPlayer: Player | undefined;
  hand: SelectableCard[];
}

function App (props: { game: Game }): React.JSX.Element {
  const [state, setState] = useState<AppState>({
    rows: props.game.board.getRows(),
    currentPlayer: props.game.currentPlayer,
    hand: mapCards(props.game.currentPlayer?.hand)
  })
  const initialPlayer = props.game.currentPlayer
  if (initialPlayer == null) {
    return (
      <div>Game initializing</div>
    );
  }

  let selectedCard: SelectableCard;

  function playCard (): void {
    props.game.currentPlayer?.playCard(selectedCard.number)

    if (props.game.currentPlayer != null) {
      const handCards = mapCards(props.game.currentPlayer?.hand)
      console.log('Hand cards', handCards)
      if (handCards != null) {
        setState({ ...state, hand: handCards, rows: props.game.board.getRows() })
      }
    }
  }

  const selectCard = (card: SelectableCard): void => {
    selectedCard = card;
  }

  console.log('RENDER')
  return (
    <div className="app">
      <div>Game seed: {props.game.seed}</div>
      {<BoardComponent rows={state.rows} /> }
      {<br/>}
      <HandComponent key={state.currentPlayer?.name} selectCard={selectCard} cards={state.hand}></HandComponent>
      <br/>
      <div>
        <div>current player</div>
        {props.game.currentPlayer?.name}
        <div>points</div>
        {props.game.currentPlayer?.points}
        <div>highest card</div>
        {props.game.currentPlayer?.highestCard?.number}
      </div>
      <button onClick={playCard}>play card</button>
    </div>
  )
}

const mapCards = (cards: Card[] | undefined): SelectableCard[] => {
  if (cards == null) {
    return []
  }
  return cards.map(c => Object.assign(c, { selected: false }))
}

export default App
