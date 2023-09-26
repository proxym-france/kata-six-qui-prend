import React from 'react';
import { type Card } from '../model/card';

export function renderPointsBlock(props: { card: Card }): React.JSX.Element {
  const points: React.JSX.Element[] = [];

  for (let i = 0; i < props.card.points; i++) {
    points.push(
      <span key={`point-${i}`} className={'point'}>
        *
      </span>
    );
  }

  let pointsBlock = <div></div>;

  if (!props.card.hidden) {
    pointsBlock = (
      <>
        <span className={'numeral'}>{props.card.number}</span>
        <div className={'points'}>{points}</div>
      </>
    );
  }
  return pointsBlock;
}

export function CardComponent(props: { card: Card }): React.JSX.Element {
  const pointsBlock = renderPointsBlock(props);

  return (
    <div
      className={`card ${props.card.hidden ? 'hidden' : 'visible'}`}
      data-number={props.card.number}
      data-points={props.card.points}
    >
      {pointsBlock}
    </div>
  );
}
