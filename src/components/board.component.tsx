import React from 'react';
import { type Row } from '../model/row';
import { RowComponent } from './row.component';
import { TrickComponent } from './trick.component';
import { type CardAndPlayer } from '../model/game';
import { DeckComponent } from './deck.component';

export const BoardComponent = (props: {
  rows: Row[];
  trick: CardAndPlayer[];
  deckCards: number;
}): React.JSX.Element => {
  return (
    <div id={'board'}>
      <DeckComponent cards={props.deckCards} />
      <div id={'board-content'}>
        {props.rows.map((row) => (
          <RowComponent key={row.lastCard?.number} cards={row.cards} />
        ))}
        <TrickComponent trick={props.trick} />
      </div>
    </div>
  );
};
