import type React from "react";
import type {
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";

type NumberInputProps<T extends FieldValues> =
	React.InputHTMLAttributes<HTMLInputElement> & {
		name: Path<T>;
		register?: UseFormRegister<T>;
		registerOptions?: RegisterOptions<T, Path<T>>;
	};

const NumberInput = <T extends FieldValues>(props: NumberInputProps<T>) => {
	const { className, register, registerOptions, ...inputAttrs } = props;
	return (
		<>
			{register ? (
				<input
					{...inputAttrs}
					{...register(inputAttrs.name, registerOptions)}
					className={` w-16 p-1 border border-borderlightgray  ${className || ""}`}
				/>
			) : (
				<input
					{...inputAttrs}
					className={` w-16 p-1 border border-borderlightgray  ${className || ""}`}
				/>
			)}
		</>
	);
};

export default NumberInput;
