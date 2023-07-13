import React from 'react';
import { type Card } from '../model/card';

export function CardComponent(props: { card: Card }): React.JSX.Element {
  const points: React.JSX.Element[] = [];

  for (let i = 0; i < props.card.points; i++) {
    points.push(
      <span key={`point-${i}`} className={'point'}>
        *
      </span>
    );
  }

  return (
    <div className={'card'}>
      {props.card.number}
      <div className={'points'}>{points}</div>
    </div>
  );
}
