const AddIcon = ({ style }: { style?: React.CSSProperties }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="#252528"
			xmlns="http://www.w3.org/2000/svg"
			style={style}
			role="img"
			aria-label="Add"
		>
			<g clipPath="url(#clip0_9_435)">
				<path d="M21 11.2H12.7V3H11.2V11.2H3V12.7H11.2V21H12.7V12.7H21V11.2Z" />
			</g>
			<defs>
				<clipPath id="clip0_9_435">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default AddIcon;
