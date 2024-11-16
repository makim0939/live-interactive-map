import AddIcon from '../icon/AddIcon';
import BoothListItem from './BoothListItem';
import ArrowBackwardIcon from '../icon/ArrowBackwardIcon';
import { Booth } from '../../types';

type BoothListProps = {
  booths: Booth[];
  isFormOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectedRectState: [number, React.Dispatch<React.SetStateAction<number>>];
};

const BoothList = (props: BoothListProps) => {
  const [isFormOpen, setIsFormOpen] = props.isFormOpenState;
  const [selectedRect, setSelectedRect ] = props.selectedRectState;
  const onAddButtonClick = () => {
    setIsFormOpen(true);
  };
  const onBackButtonClick = () => {
    setIsFormOpen(false);
  };

  return (
    <div className=" w-60 min-h-[508px] p-4 ">
      <div className=" flex items-center justify-between ">
        <h2 className=" text-center text-2xl font-semibold">ブース</h2>
        {isFormOpen ? (
          <button onClick={onBackButtonClick}>
            <ArrowBackwardIcon />
          </button>
        ) : (
          <button onClick={onAddButtonClick}>
            <AddIcon />
          </button>
        )}
      </div>
      <ul>
        {props.booths.map((booth, i) => (
          <div key={i}>
            <BoothListItem boothName={booth.name} boothDescription={booth.description} i={i} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BoothList;
