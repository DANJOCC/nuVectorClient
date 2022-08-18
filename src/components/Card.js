import React from 'react'

export default function Card({title,intro}) {
  return (
    <li className='card'>
        <h1 className='card-title'>{title}</h1>
        <p className='card-intro'>
          {intro}
        </p>
    </li>
  )
}
