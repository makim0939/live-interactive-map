import AddIcon from './icon/AddIcon';
import BoothListItem from './BoothListItem';
import { useQuery } from '@tanstack/react-query';
import { selectAllBooths } from '../utils/supabaseFunctions';
import ArrowBackwardIcon from './icon/ArrowBackwardIcon';

const BoothList = ({
  isFormOpen,
  setIsFormOpen,
}: {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const query = useQuery({ queryKey: ['booths'], queryFn: selectAllBooths });
  return (
    <div className=" w-60 min-h-[508px] p-4 ">
      <div className=" flex items-center justify-between ">
        <h2 className=" text-center text-2xl font-semibold">ブース</h2>
        {isFormOpen ? (
          <ArrowBackwardIcon onClick={() => setIsFormOpen(false)} />
        ) : (
          <AddIcon onClick={() => setIsFormOpen(true)} />
        )}
      </div>
      <ul>
        {query.data?.map((booth) => (
          <>
            <BoothListItem boothName={booth.name} boothDescription={booth.description} />
          </>
        ))}
      </ul>
    </div>
  );
};

export default BoothList;
