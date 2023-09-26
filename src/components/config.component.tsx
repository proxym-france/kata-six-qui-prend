import React, { useState } from 'react';
import { type Game } from '../model/game';
import { Player } from '../model/player';

export const ConfigComponent = (props: {
  game: Game;
  onStartGame: any;
  onAddPlayer: any;
}): React.JSX.Element => {
  const game = props.game;
  const [playerId, setPlayerId] = useState(1);

  const startGame = (): void => {
    try {
      game.start();
      props.onStartGame();
    } catch (err: any) {
      alert(err.message);
      console.error('Unable to start game', err);
    }
  };

  const addPlayer = (): void => {
    game.addPlayer(new Player(playerId, playerId.toString()));
    setPlayerId(playerId + 1);
    props.onAddPlayer();
  };

  return (
    <div hidden={props.game.isStarted} className={'config'}>
      <h2>Config</h2>
      <button id={'add-player'} onClick={addPlayer}>
        Add Player
      </button>
      <button id={'start-game'} onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};
