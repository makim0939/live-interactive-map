import type { Booth } from "../../types";
import AddIcon from "../icon/AddIcon";
import ArrowBackwardIcon from "../icon/ArrowBackwardIcon";
import BoothListItem from "./BoothListItem";
import type { BoothFormState } from "./BoothSettings";

type BoothListProps = {
	booths: Booth[];
	openFormState: [
		BoothFormState,
		React.Dispatch<React.SetStateAction<BoothFormState>>,
	];
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
					<button type="button" onClick={onBackButtonClick}>
						<ArrowBackwardIcon />
					</button>
				) : (
					<button type="button" onClick={onAddButtonClick}>
						<AddIcon />
					</button>
				)}
			</div>
			<ul>
				{props.booths.map((booth) => (
					<div key={booth.id}>
						<BoothListItem
							booth={booth}
							setOpenForm={setOpenForm}
							setSelectedBoothId={props.setSelectedBoothId}
						/>
					</div>
				))}
			</ul>
		</div>
	);
};

export default BoothList;
