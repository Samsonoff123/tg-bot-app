import React from 'react'

export default function Table({device}) {
  return (
    <table>
    <tbody>
      <tr>
        <th>Производитель:</th>
        <td>{device?.variations.Manufacturer}</td>
      </tr>
      <tr>
        <th>Гарантия:</th>
        <td>12 месяцев</td>
      </tr>
      {
        device?.variations.memory ?
          <tr>
            <th>Объем памяти:</th>
            <td>{device?.variations.memory}</td>
          </tr>
        : null
      }

      {
        device?.variations.sim ? 
          <tr>
            <th>{(device?.typeId ===2) ? 'P/N'  : 'Параметры SIM:'}</th> { /* исправить */ }
            <td>{device?.variations.sim}</td>
          </tr>
        : null
      }

      {
        device?.variations.set ? 
          <tr>
            <th>{(device?.typeId ===2) ? 'Беспроводная связь'  : 'Комплектация'}</th> { /* исправить */ }
            <td>{device?.variations.set}</td>
          </tr>
        : null
      }

      {
        device?.variations.body_size ? 
        <tr>
          <th>Размер корпуса:</th>
          <td>{device?.variations.body_size}</td>
        </tr>
        : null
      }

      {
        device?.variations.series ? 
        <tr>
          <th>Серия:</th>
          <td>{device?.variations.series}</td>
        </tr>
        : null
      }

      {
        device?.variations.band_size ? 
        <tr>
          <th>Размер ремешка на выбор при заказе:</th>
          <td>{device?.variations.band_size}</td>
        </tr>
        : null
      }

      {
        device?.variations.PN ? 
          <tr>
            <th>P/N:</th>
            <td>{device?.variations.PN}</td>
          </tr>
        : null
      }

      {
        device?.variations.keyboard ? 
          <tr>
            <th>Раскладка клавиатуры:</th>
            <td>{device?.variations.keyboard}</td>
          </tr>
        : null
      }

      {
        device?.variations.CPU ? 
          <tr>
            <th>Процессор:</th>
            <td>{device?.variations.CPU}</td>
          </tr>
        : null
      }

      {
        device?.variations.RAM ? 
          <tr>
            <th>Объем оперативной памяти:</th>
            <td>{device?.variations.RAM}</td>
          </tr>
        : null
      }

      {
        device?.variations.SSD ? 
          <tr>
            <th>Общий объем SSD:</th>
            <td>{device?.variations.SSD}</td>
          </tr>
        : null
      }

      {
        device?.variations.video_card ? 
          <tr>
            <th>Название видеокарты:</th>
            <td>{device?.variations.video_card}</td>
          </tr>
        : null
      }

    </tbody>
  </table>
  )
}
