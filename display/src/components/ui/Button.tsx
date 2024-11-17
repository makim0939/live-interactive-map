import type React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string;
};
const Button = (props: ButtonProps) => {
	const { text, className, ...buttonAttrs } = props;
	return (
		<button
			{...buttonAttrs}
			className={`w-fit px-4 py-1 rounded-sm bg-blue-600 text-white ${className || ""}`}
		>
			{text}
		</button>
	);
};

export default Button;
