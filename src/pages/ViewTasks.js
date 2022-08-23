import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Tables from '../components/Tables'
import { fetchs } from '../helpers'

export default function ViewTasks({name,filter}) {
    const navigate=useNavigate()
    const {token}=useSelector(state=>state.auth)
    const [loading, setLoading]=useState(false)
    const [tasks, setTasks]=useState(null)

    const redirecTo=()=>{
        navigate('/workspace',{replace:true})
    }

    const fetching=async ()=>{
        setLoading(true)
        try {
        
           const task = await fetchs.getTasksFilters('default','default',token)
           
           console.log(task)
            setTasks(task.tasks)  
          
        } catch (error) {
          console.error(error)
        }
        finally{
          setLoading(false)
        }
      }

    useEffect(()=>{
        fetching()
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
                </ul>
            </div>
        <div className='top-card'>
            <div className='flex flex-row gap-x-2 w-[98%] m-4 place-content-center overflow-auto'>
            {   !loading && tasks!==null && typeof tasks!=='undefined' &&
                <Tables title='Tasks' headers={['N#','Description','Date','Hours', 'Bill','Contractor','Project','Client','Product','Activity','Category']} rows={tasks} type='TASK'></Tables>}
            {loading && <h1>Waiting for tasks...</h1>}
            </div>
           
        </div>
    </div>
  )
}
