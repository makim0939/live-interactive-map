const ArrowBackwardIcon = ({ style }: { style?: React.CSSProperties }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="#252528"
			xmlns="http://www.w3.org/2000/svg"
			style={style}
			role="img"
			aria-label="Backward"
		>
			<mask
				id="mask0_20_447"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="24"
				height="24"
			>
				<rect
					x="24"
					y="24"
					width="24"
					height="24"
					transform="rotate(-180 24 24)"
					fill="#D9D9D9"
				/>
			</mask>
			<g mask="url(#mask0_20_447)">
				<path d="M7.37307 11.25L19.5 11.25V12.75L7.37307 12.75L13.0692 18.4462L12 19.5L4.50005 12L12 4.50005L13.0692 5.55387L7.37307 11.25Z" />
			</g>
		</svg>
	);
};

export default ArrowBackwardIcon;
