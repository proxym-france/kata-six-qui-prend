import React from 'react'
import { type Row } from '../model/row'
import { RowComponent } from './row.component'

export const BoardComponent = (props: { rows: Row[] }): React.JSX.Element => {
  return (
    <div className={'board'}>
      {props.rows.map(row => <RowComponent key={row.lastCard?.number} cards={row.cards} />)}
    </div>
  )
}
