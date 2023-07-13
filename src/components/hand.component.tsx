import React, { useState } from 'react';
import { type Card } from '../model/card';
import { SelectableCardComponent } from './selectable-card.component';

export type SelectableCard = Card & { selected: boolean };

export function HandComponent(props: {
  cards: SelectableCard[];
  selectCard: any;
}): React.JSX.Element {
  const [cards, setCards] = useState([...props.cards]);

  const selectCard = (card: SelectableCard): void => {
    props.cards?.forEach((c: SelectableCard): void => {
      c.selected = false;
    });
    card.selected = true;

    setCards([...cards]);

    props.selectCard(card);
  };

  // console.log('Rerender HAND', cards)
  return (
    <div className="hand">
      {props.cards?.map((c) => (
        <SelectableCardComponent
          key={c.number}
          card={c}
          selectCard={selectCard}
        />
      ))}
    </div>
  );
}
