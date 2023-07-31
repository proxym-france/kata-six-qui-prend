import React from 'react';
import { type SelectableCard } from './hand.component';

interface CardComponentParams {
  card: SelectableCard;
  selectCard: any;
  playCard: any;
  selected?: boolean;
}

export function SelectableCardComponent(props: CardComponentParams): React.JSX.Element {
  const className = `card visible ${props?.card.selected ?? false ? 'selected' : ''}`;

  const points: React.JSX.Element[] = [];
  for (let i = 0; i < props.card.points; i++) {
    points.push(
      <span key={`point-${i}`} className={'point'}>
        *
      </span>
    );
  }

  return (
    <div
      data-number={props.card.number}
      data-points={props.card.points}
      className={className}
      onDoubleClick={() => props.playCard(props.card)}
      onClick={() => props.selectCard(props.card)}
    >
      <span className={'numeral'}>{props.card.number}</span>
      <div className={'points'}>{points}</div>
    </div>
  );
}
