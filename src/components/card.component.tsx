import React from 'react'
import { type Card } from '../model/card'

export function CardComponent(props: { card: Card }): React.JSX.Element {
  return (
    <div className={'card'}>
      {props.card.number}
    </div>
  )
}
