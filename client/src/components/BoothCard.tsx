import { useRef, useState } from "react";
import FavoriteFillIcon from "./icon/FavoriteFillIcon";
import FavoriteStrokeIcon from "./icon/FavoriteStrokeIcon";

const BoothCard = ({ name, description }: { name: string; description: string }) => {
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);
  const favFillIconRef = useRef<SVGSVGElement>(null);

  const FavAnimation = async () => {
    if (!favFillIconRef.current) return;
    favFillIconRef.current.style.transform = "scale(1.4)";
    setTimeout(() => {
      if (!favFillIconRef.current) return;
      favFillIconRef.current.style.transform = "scale(1)";
    }, 200);
  };
  const onFavButtonClick = () => {
    setIsFavoriteClicked(true);
    FavAnimation();
  };
  return (
    <div className=" fixed bottom-4 z-10 w-[96vw] h-20 mx-[2%] p-4  bg-bgwhite rounded-md flex justify-around items-center ">
      <div className=" w-[80vw] flex flex-col justify-center ">
        <p className=" text-lg">
          <b>{name}</b>
        </p>
        <p className=" text-textgray truncate">{description}</p>
      </div>
      <button
        type="button"
        onClick={onFavButtonClick}
        className=" w-fit h-fit pt-2 [&_svg]:duration-100 [&_svg]:ease-in-out"
      >
        {isFavoriteClicked ? (
          <FavoriteFillIcon
            ref={favFillIconRef}
            style={{
              width: 32,
              height: 32,
              fill: "#ee3311",
            }}
          />
        ) : (
          <FavoriteStrokeIcon style={{ width: 32, height: 32, fill: "#757578" }} />
        )}
      </button>
    </div>
  );
};

export default BoothCard;
