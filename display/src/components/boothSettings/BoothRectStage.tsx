import { useAtom } from 'jotai';
import { Layer, Stage } from 'react-konva'
import { contentsRectAtom } from '../../atoms';
import { Booth, BoothInsertProps} from '../../types';
import { UseFormReturn } from 'react-hook-form';
import BoothRect from './BoothRect';
import { BoothFormState } from './BoothSettings';


type BoothRectStageProps = {
    boothRects: Omit<Booth, "name" |"description">[];
    hookForm: UseFormReturn<BoothInsertProps, undefined>
    openForm: BoothFormState; 
    selectedBoothId: number;
}   
const BoothRectStage = (props: BoothRectStageProps) => {
    const [contentsRect,] = useAtom(contentsRectAtom);
    const {setValue} = props.hookForm;
  return (
    <div className=' absolute left-0 top-0 z-0' style={{transform: `translate(${contentsRect.left}px, ${contentsRect.top}px)`}}>
       <Stage width={contentsRect.width} height={contentsRect.height}>
        <Layer>
          {props.boothRects.map((boothRect, i) => (
              <BoothRect key={i} rect={boothRect} selected={boothRect.id === props.selectedBoothId} setValue={setValue} />
          ))}
          {props.openForm === "add" && <BoothRect rect={{left: 0, top: 0, width: 100, height: 100}} selected={true} setValue={setValue} />}
        </Layer>
      </Stage>
    </div>
  )
}

export default BoothRectStage
