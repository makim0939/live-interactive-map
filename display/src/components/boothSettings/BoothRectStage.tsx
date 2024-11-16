import { useAtom } from 'jotai';
import { Layer, Stage } from 'react-konva'
import { contentsRectAtom } from '../../atoms';
import { BoothInsertProps, Rect as RectProps } from '../../types';
import { UseFormReturn } from 'react-hook-form';
import BoothRect from './BoothRect';

type BoothRectStageProps = {
    boothRects: RectProps[];
    hookForm: UseFormReturn<BoothInsertProps, undefined>
    isFormOpen: boolean; 
}   
const BoothRectStage = (props: BoothRectStageProps) => {
    const [contentsRect,] = useAtom(contentsRectAtom);
    const {setValue} = props.hookForm;
  return (
    <div className=' absolute left-0 top-0 z-0' style={{transform: `translate(${contentsRect.left}px, ${contentsRect.top}px)`}}>
       <Stage width={contentsRect.width} height={contentsRect.height}>
        <Layer>
          {props.boothRects.map((rect, i) => (
            <>
              <BoothRect key={i} rect={rect} selected={false} setValue={setValue} />
            </>
          ))}
          {props.isFormOpen && <BoothRect rect={{left: 0, top: 0, width: 100, height: 100}} selected={true} setValue={setValue} />}
        </Layer>
      </Stage>
    </div>
  )
}

export default BoothRectStage
