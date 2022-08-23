/*
page to see projects info if you are admin or contractor, and edit (only admin)
*/

import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchs } from '../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Tables from '../components/Tables'
import FormProject from '../components/FormProject'

export default function Project() {
  const pages=[0,1,2]

  const {user,token}=useSelector(state=>state.auth)

  const [editable,setEditable]=useState(false)

  const [page,setPage]=useState(0)

  const [project,setProject]=useState(null)

  const [products, setProducts]=useState(null)

  const [activities, setActivities]=useState(null)

  const [client,setClient]=useState('')

  const navigate=useNavigate()
  
  const {id}=useParams()

  const edit=()=>{
    setEditable(true)
    console.log(editable)
  }

  const redirecTo=()=>{
    navigate('/workspace',{replace:true})
  }

  const  fetching= async(id)=>{
    try {

         const data =await fetchs.getProject(id,token)
          console.log(data.client)
         setProject(data.project)
         setClient(data.client.name)
         setProducts(data.products)
         setActivities(data.activities)
    
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetching(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
                 { user.role ==='ADMIN' && <li className='list-item'>
                    <button className='regular-buttom' onClick={()=>{edit()}}>
                    <FontAwesomeIcon icon={solid('pen')} size='lg'/>
                      Edit
                    </button>
                  </li>}
        </ul>
      </div>
      <div className={page===0 ? 'center-card': 'top-card'}>
        {project!==null && typeof project!=='undefined' && !editable && page===0 &&
        <FormProject token={token} edit={false} empty={false} data={{
            id:project._id,
            name:project.name,
            client:client,
            description:project.description,
            start:new Date(project.start).toISOString().split('T')[0],
            end:new Date(project.end).toISOString().split('T')[0],
            active:project.active
        }}/>
        }
        {project!==null && typeof project!=='undefined' && editable && page===0 &&
        <FormProject token={token} edit={true} empty={false} data={{
            id:project._id,
            name:project.name,
            client:client,
            description:project.description,
            start:new Date(project.start).toISOString().split('T')[0],
            end:new Date(project.end).toISOString().split('T')[0],
            active:project.active
        }}/>
        }
        {project!==null && typeof project!=='undefined' && page===1 &&
           <div className='flex flex-row gap-x-2 w-[98%] m-4 overflow-auto'>
            <Tables title='Products' headers={['N#','Name','Description','State']} rows={products} type='FORM'></Tables>
            <Tables title='Activities' headers={['N#','Name','Description','State']} rows={activities} type='FORM'></Tables>
         </div>
        }
        
      </div>
      <div className='flex flex-row gap-x-5 m-2'>
        <button className='normal-buttom' onClick={()=>{setPage((prev)=>{
          if(page>0){
            return page-1
          }
          if(page===0){
            return 0
          }
        })}}>
          <FontAwesomeIcon icon={solid('arrow-left-long')} size='lg'/>
          </button>
        <div className='text-black text-xl font-bold flex text-center place-content-center items-center'>{page}</div>
        <button className='normal-buttom' onClick={()=>{setPage((prev)=>{
          if(page===pages.length-1){
            return 0
          }
          if(page<pages.length){
            return page+1
          }
          
        })}}>
          <FontAwesomeIcon icon={solid('arrow-right-long')} size='lg'/>
          </button>
        </div>
    </div>
  )
}
