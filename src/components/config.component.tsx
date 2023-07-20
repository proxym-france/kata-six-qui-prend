import React, { useState } from 'react';
import { type Game } from '../model/game';
import { Player } from '../model/player';

export const ConfigComponent = (props: {
  game: Game;
  onStartGame: any;
  onAddPlayer: any;
}): React.JSX.Element => {
  const game = props.game;
  const [playerId, setPlayerId] = useState(0);

  const startGame = (): void => {
    game.start();
    props.onStartGame();
  };

  const addPlayer = (): void => {
    game.addPlayer(new Player(playerId.toString()));
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
