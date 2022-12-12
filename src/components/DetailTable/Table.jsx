import React from 'react'
import { useEffect } from 'react'

export default function Table({variations}) {

  return (
    <table>
    <tbody>
      {
        variations?.head.map((th, indx) => 
          <tr>
            <th>{ th }</th>
            <td>{ variations.body[indx] }</td>
          </tr>
        )
      }
    </tbody>
  </table>
  )
}
