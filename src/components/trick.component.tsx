import { CardComponent } from './card.component';
import React from 'react';
import { type CardAndPlayer } from '../model/game';

export const TrickComponent = (props: { trick: CardAndPlayer[] }): React.JSX.Element => {
  return (
    <div className={'trick'}>
      {props.trick.map((cardAndPlayer) => (
        <CardComponent key={`trick-${cardAndPlayer.card.number}`} card={cardAndPlayer.card} />
      ))}
    </div>
  );
};
