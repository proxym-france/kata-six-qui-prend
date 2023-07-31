import React from 'react';
import { type Player } from '../model/player';

export const PlayersComponent = (props: {
  players: Player[];
  currentPlayer: string | undefined;
}): React.JSX.Element => {
  const isCurrent = (player: string | undefined): string => {
    return player === props.currentPlayer ? 'current' : '';
  };

  return (
    <div className={'players'}>
      <h2>Players</h2>
      {props.players.map((player) => (
        <div key={player.name} className={`player ${isCurrent(player.name)}`}>
          <div>
            Player <b>{player.name}</b>
          </div>
          <div>
            Points <b>{player.points}</b>
          </div>
        </div>
      ))}
    </div>
  );
};
