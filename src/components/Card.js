/*component to show project's resume */

import React from 'react'
import { generatePath,useNavigate } from 'react-router-dom'

export default function Card({title,intro,id}) {
  const navigate=useNavigate()
  const redirecTo=()=>{
    const path=generatePath("/project/:id",{id})
    navigate(path,{replace:true})
  }

  return (
    <li className='card' onClick={redirecTo}>
        <h1 className='card-title'>{title}</h1>
        <p className='card-intro'>
          {intro}
        </p>
    </li>
  )
}
