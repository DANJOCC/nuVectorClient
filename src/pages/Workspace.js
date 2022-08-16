import React from 'react'
import Card from '../components/Card'

export default function Workspace() {
  return (
    <div className='center-div'>
        <div className='center-list-div'>
               <ul className='list'>
        <li className='list-item'>
                <button className='regular-buttom'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                New project
                </button>
            </li>
        </ul>
        </div>
       
        <div className='center-content-cards'>
           <ul className='list-cards'>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
           </ul>
        </div>
    </div>
  )
}
