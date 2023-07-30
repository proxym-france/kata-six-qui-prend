import React from 'react';

interface DeckProps {
  cards: number;
}

export const DeckComponent = (props: DeckProps): React.JSX.Element => {
  return (
    <div id={'deck'} className={'card'}>
      <span className={'numeral'}>{props.cards}</span>
    </div>
  );
};
