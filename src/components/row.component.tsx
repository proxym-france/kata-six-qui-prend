import React from 'react';
import { type Card } from '../model/card';
import { CardComponent } from './card.component';

export const RowComponent = (props: { cards: Card[] }): React.JSX.Element => {
  return (
    <div className={'row'}>
      {props.cards.map((c) => (
        <CardComponent key={c.number} card={c} />
      ))}
    </div>
  );
};
