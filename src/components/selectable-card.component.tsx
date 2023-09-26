import React from 'react';
import { type SelectableCard } from './hand.component';
import { renderPointsBlock } from './card.component';

interface CardComponentParams {
  card: SelectableCard;
  selectCard: any;
  playCard: any;
  selected?: boolean;
}

export function SelectableCardComponent(props: CardComponentParams): React.JSX.Element {
  const className = `card ${props.card.hidden ? 'hidden' : 'visible'} ${
    props?.card.selected ?? false ? 'selected' : ''
  }`;

  const pointsBlock = renderPointsBlock(props);

  return (
    <div
      data-number={props.card.number}
      data-points={props.card.points}
      className={className}
      onDoubleClick={() => props.playCard(props.card)}
      onClick={() => props.selectCard(props.card)}
    >
      {pointsBlock}
    </div>
  );
}
