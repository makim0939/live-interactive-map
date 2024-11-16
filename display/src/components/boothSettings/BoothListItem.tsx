import { useState } from 'react';
import MoreIcon from '../icon/MoreIcon';
import ToggleIcon from '../icon/ToggleIcon copy';

type BoothListItemProps = {
  i: number;
  boothName: string;
  boothDescription: string;
};

const BoothListItem = (props: BoothListItemProps) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <li className=" my-4 w-full  ">
      <div className=" flex items-center ">
        <button className=" mr-1 " onClick={() => setIsToggleOpen(!isToggleOpen)}>
          <ToggleIcon
            style={isToggleOpen ? { width: 13, transform: 'rotate(90deg)' } : { width: 13 }}
          />
        </button>

        <p
          className=" w-full mr-2 truncate hover:underline decoration-textlightgray"
          onClick={() => console.log(props.boothName, 'clicked')}
        >
          {props.boothName}
        </p>

        <MoreIcon style={{ fill: '#757578', width: 32, height: 32 }} />
      </div>
      {isToggleOpen && (
        <div className=" w-full max-h-16 ml-4 text-sm ">
          <p className=" text-textgray ">{props.boothDescription}</p>
        </div>
      )}
    </li>
  );
};

export default BoothListItem;
