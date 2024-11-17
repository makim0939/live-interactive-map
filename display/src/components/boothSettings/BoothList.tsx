import AddIcon from '../icon/AddIcon';
import BoothListItem from './BoothListItem';
import ArrowBackwardIcon from '../icon/ArrowBackwardIcon';
import { Booth } from '../../types';
import { BoothFormState } from './BoothSettings';

type BoothListProps = {
  booths: Booth[];
  openFormState: [BoothFormState, React.Dispatch<React.SetStateAction<BoothFormState>>];
  setSelectedBoothId: React.Dispatch<React.SetStateAction<number>>;
};

const BoothList = (props: BoothListProps) => {
  const [openForm, setOpenForm] = props.openFormState;
  const onAddButtonClick = () => {
    props.setSelectedBoothId(-1);
    setOpenForm("add");
  };
  const onBackButtonClick = () => {
    setOpenForm("none");
  };

  return (
    <div className=" w-60 min-h-[508px] p-4 ">
      <div className=" flex items-center justify-between ">
        <h2 className=" text-center text-2xl font-semibold">ブース</h2>
        {openForm !== "none" ? (
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
            <BoothListItem booth={booth} setOpenForm={setOpenForm}  setSelectedBoothId={props.setSelectedBoothId} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BoothList;
