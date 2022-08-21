/*
page to create projects if you are admin
*/

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import FormProject from '../components/FormProject'
export default function CreateProject({token}) {

  const navigate=useNavigate()
 



  const redirecTo=()=>{
    navigate('/workspace',{replace:true})
  }

  
  return (
    <div className='center-div'>
      <div className='center-list-div'>
               <ul className='list'>
                  <li className='list-item'>
                    <button className='regular-buttom' onClick={()=>{redirecTo()}}>
                    <FontAwesomeIcon icon={solid('circle-arrow-left')} size='lg'/>
                      Back
                    </button>
                  </li>
        </ul>
      </div>
      <div className='center-card'>
        <h6 className='title-normal'>New Project</h6>
          <FormProject token={token} edit={false} empty={true}></FormProject>
      </div>
    </div>
  )
}
