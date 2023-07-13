import React from 'react';
import { type SelectableCard } from './hand.component';

interface CardComponentParams {
  card: SelectableCard;
  selectCard: any;
  selected?: boolean;
}

export function SelectableCardComponent(
  props: CardComponentParams
): React.JSX.Element {
  const className = `card ${props?.card.selected ?? false ? 'selected' : ''}`;

  const points: React.JSX.Element[] = [];
  for (let i = 0; i < props.card.points; i++) {
    points.push(
      <span key={`point-${i}`} className={'point'}>
        *
      </span>
    );
  }

  return (
    <div className={className} onClick={() => props.selectCard(props.card)}>
      {props.card.number}
      <div className={'points'}>{points}</div>
    </div>
  );
}
