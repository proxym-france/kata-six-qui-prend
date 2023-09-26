import React, { useState } from 'react';
import './App.css';
import { HandComponent, type SelectableCard } from './components/hand.component';
import type { CardAndPlayer, Game } from './model/game';
import { type Card } from './model/card';
import { type Player } from './model/player';
import { type Row } from './model/row';
import { BoardComponent } from './components/board.component';
import { PlayersComponent } from './components/players.component';
import { ConfigComponent } from './components/config.component';

interface AppState {
  rows: Row[];
  currentPlayer: Player | undefined;
  hand: SelectableCard[];
  trick: CardAndPlayer[];
  isStarted: boolean;
}

function App(props: { game: Game }): React.JSX.Element {
  const [state, setState] = useState<AppState>({
    rows: props.game.board.getRows(),
    currentPlayer: props.game.currentPlayer,
    trick: props.game.trick,
    hand: mapCards(props.game.currentPlayer?.hand),
    isStarted: false
  });

  const showCurrentPlayerCards = (): void => {
    props.game.currentPlayer?.hand.forEach((card) => card.show());

    setState({ ...state });
  };

  props.game.turnCallback = () => {
    showCurrentPlayerCards();
    state.rows.flatMap((row) => row.cards).forEach((card) => card.show());

    setState({
      ...state,
      trick: [...state.trick]
    });
  };

  let selectedCard: SelectableCard;

  function playCard(): void {
    if (state.currentPlayer != null) {
      for (let i = 0; i < state.trick.length; i++) {
        const cardAndPlayer = state.trick[i];

        if (cardAndPlayer.player.name === state.currentPlayer.name) {
          cardAndPlayer.card = selectedCard;
          setState({
            ...state,
            trick: [...state.trick]
          });
          return;
        }
      }

      setState({
        ...state,
        trick: [...state.trick, { card: selectedCard, player: state.currentPlayer }]
      });
    }
  }

  function initState(): void {
    if (props.game.currentPlayer != null) {
      const handCards = mapCards(props.game.currentPlayer?.hand);
      console.log('Hand cards', handCards);
      if (handCards != null) {
        setState({
          currentPlayer: props.game.currentPlayer,
          hand: handCards,
          trick: props.game.trick,
          rows: props.game.board.getRows(),
          isStarted: props.game.isStarted
        });
      }
    }
  }

  const next = (): void => {
    const currentPlayerCard = state.trick.find(
      (c) => c.player.name === props.game.currentPlayer?.name
    );
    if (currentPlayerCard != null) {
      try {
        props.game.currentPlayer?.playCard(currentPlayerCard.card.number);
        showCurrentPlayerCards();
      } catch (error) {
        showCurrentPlayerCards();
        if (error instanceof Error) {
          alert(`error ${error.message}`);
        }
      }
    }
    initState();
  };

  const done = (): void => {
    if (state.currentPlayer == null) {
      throw new Error('There is no current player !');
    }

    state.trick.forEach((cardAndPlayer) => cardAndPlayer.card.hide());
    state.currentPlayer?.hand.forEach((card) => card.hide());

    setState({
      ...state,
      trick: [...state.trick]
    });
  };

  const onStartGame = (): void => {
    initState();
  };

  const selectCard = (card: SelectableCard): void => {
    selectedCard = card;
  };

  const onAddPlayer = (): void => {
    initState();
  };

  let mainContent: React.JSX.Element;

  if (state.isStarted) {
    mainContent = (
      <>
        <h2>Six Takes Game</h2>
        <div>Game seed: {props.game.seed}</div>
        {
          <BoardComponent
            deckCards={props.game.deck.cards.length}
            rows={state.rows}
            trick={state.trick}
          />
        }
        {<br />}
        <HandComponent
          key={state.currentPlayer?.name}
          selectCard={selectCard}
          playCard={playCard}
          cards={state.hand}
        ></HandComponent>
        <br />
        <button id="done" onClick={done}>
          Done
        </button>
        <button id="cancel" onClick={showCurrentPlayerCards}>
          Cancel
        </button>
        <button id="next" onClick={next}>
          Next
        </button>
      </>
    );
  } else {
    mainContent = (
      <ConfigComponent game={props.game} onStartGame={onStartGame} onAddPlayer={onAddPlayer} />
    );
  }

  return (
    <div className="app">
      <div className={'main-content'}>{mainContent}</div>
      <div className={'side-content'}>
        <PlayersComponent players={props.game.players} currentPlayer={state.currentPlayer?.name} />
      </div>
    </div>
  );
}

const mapCards = (cards: Card[] | undefined): SelectableCard[] => {
  if (cards == null) {
    return [];
  }
  return cards.map((c) => Object.assign(c, { selected: false }));
};

export default App;
