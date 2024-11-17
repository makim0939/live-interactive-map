import BoothList from './BoothList'
import BoothForm from './BoothForm'
import BoothRectStage from './BoothRectStage'
import { useQuery } from '@tanstack/react-query'
import { selectAllBooths } from '../../utils/supabaseFunctions'
import { useForm } from 'react-hook-form'
import { BoothInsertProps } from '../../types'
import { useState } from 'react'
import Draggable from '../ui/Draggable'


const BoothSettings = () => {
    const hookForm = useForm<BoothInsertProps>();
    const boothsQuery = useQuery({ queryKey: ['booths'], queryFn: selectAllBooths });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBoothId, setSelectedBoothId] = useState(-1);
    
    
  return (
    <div className=' absolute top-0 left-0'>
        <Draggable>
            <div className=' flex bg-slate-50 '>
                <BoothList booths={boothsQuery.data || []} setSelectedBoothId={setSelectedBoothId} isFormOpenState={[isFormOpen, setIsFormOpen]} /> 
                {isFormOpen && <BoothForm hookForm={hookForm}  setIsFormOpen={setIsFormOpen}   />}
            </div>
        </Draggable>
        
      
      <BoothRectStage boothRects={boothsQuery.data|| []} hookForm={hookForm} isFormOpen={isFormOpen} selectedBoothId={selectedBoothId} />
    </div>
  )
}

export default BoothSettings
