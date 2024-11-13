import AddIcon from './icon/AddIcon';
import BoothListItem from './BoothListItem';

const BoothList = () => {
  return (
    <div className=" w-60 p-4 ">
      <div className=" flex items-center justify-between ">
        <h2 className=" text-center text-2xl font-semibold">ブース</h2>
        <AddIcon />
      </div>
      <ul>
        <BoothListItem
          boothName="たこ焼き屋さん"
          boothDescription="ロシアンたこ焼きあります！どこよりも熱々で美味しいたこ焼きを提供します。"
        />
        <BoothListItem boothName="テスト" boothDescription="テストです。" />
      </ul>
    </div>
  );
};

export default BoothList;
