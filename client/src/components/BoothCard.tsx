const BoothCard = ({
	title,
	description,
}: { title: string; description: string }) => {
	return (
		<div className=" fixed bottom-4 z-10 w-[96%] h-20 mx-[2%] p-4 bg-bgwhite rounded-md flex flex-col justify-center ">
			<p className=" text-lg">
				<b>{title}</b>
			</p>
			<p className=" text-textgray ">{description}</p>
		</div>
	);
};

export default BoothCard;
