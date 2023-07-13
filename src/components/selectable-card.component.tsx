import React from 'react'
import { type SelectableCard } from './hand.component'

interface CardComponentParams {
  card: SelectableCard;
  selectCard: any;
  selected?: boolean;
}

export function SelectableCardComponent (props: CardComponentParams): React.JSX.Element {
  const className = `card ${((props?.card.selected) ?? false) ? 'selected' : ''}`

  return (
    <div className={className} onClick={() => props.selectCard(props.card)}>
      {props.card.number}
    </div>
  )
}
