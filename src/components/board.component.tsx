import React from 'react';
import { type Row } from '../model/row';
import { RowComponent } from './row.component';
import { TrickComponent } from './trick.component';
import { type CardAndPlayer } from '../model/game';

export const BoardComponent = (props: {
  rows: Row[];
  trick: CardAndPlayer[];
}): React.JSX.Element => {
  return (
    <div className={'board'}>
      {props.rows.map((row) => (
        <RowComponent key={row.lastCard?.number} cards={row.cards} />
      ))}
      <TrickComponent trick={props.trick} />
    </div>
  );
};
