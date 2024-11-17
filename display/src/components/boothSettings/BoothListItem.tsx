import { useState } from 'react';
import MoreIcon from '../icon/MoreIcon';
import ToggleIcon from '../icon/ToggleIcon copy';
import { Booth } from '../../types';

type BoothListItemProps = {
  booth: Booth
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>; 
  setSelectedBoothId: React.Dispatch<React.SetStateAction<number>>;
};
const BoothListItem = (props: BoothListItemProps) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const onBoothNameClick = ()=> {
    props.setSelectedBoothId(props.booth.id)
  }
  return (
    <li className=" my-4 w-full  ">
      <div className=" flex items-center ">
        <button type='button' className=" mr-2 " onClick={() => setIsToggleOpen(!isToggleOpen)}>
          <ToggleIcon
            style={isToggleOpen ? { width: 13, transform: 'rotate(90deg)' } : { width: 13 }}
          />
        </button>

        <button type='button' onClick={onBoothNameClick} className=' w-full mr-2 pr-2 text-left truncate hover:underline decoration-textlightgray'>
          {props.booth.name} 
        </button>
        

        <MoreIcon style={{ fill: '#757578', width: 32, height: 32 }} />
      </div>
      {isToggleOpen && (
        <div className=" w-full max-h-16 ml-4 text-sm ">
          <p className=" text-textgray ">{props.booth.description}</p>
        </div>
      )}
    </li>
  );
};

export default BoothListItem;
