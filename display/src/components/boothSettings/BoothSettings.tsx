import BoothList from './BoothList'
import BoothForm from './BoothForm'
import BoothRectStage from './BoothRectStage'
import { useQuery } from '@tanstack/react-query'
import { selectAllBooths } from '../../utils/supabaseFunctions'
import { useForm } from 'react-hook-form'
import { BoothInsertProps } from '../../types'
import { useState } from 'react'

const BoothSettings = () => {
    const hookForm = useForm<BoothInsertProps>();
    const boothsQuery = useQuery({ queryKey: ['booths'], queryFn: selectAllBooths });
    const boothRects = boothsQuery.data?.map((booth) => {
        return {
            left: booth.left,
            top: booth.top,
            width: booth.width,
            height: booth.height,
        }
    })
    const selectedRectState = useState(-1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    
  return (
    <div className=' absolute top-0 left-0'>
        <div className=' flex bg-slate-50 '>
            <BoothList booths={boothsQuery.data || []} selectedRectState={selectedRectState} isFormOpenState={[isFormOpen, setIsFormOpen]} /> 
            {isFormOpen && <BoothForm hookForm={hookForm}  setIsFormOpen={setIsFormOpen}   />}
        </div>
      
      <BoothRectStage boothRects={boothRects || []} hookForm={hookForm} isFormOpen={isFormOpen} />
    </div>
  )
}

export default BoothSettings
