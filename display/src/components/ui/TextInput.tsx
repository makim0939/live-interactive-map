import React from 'react';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = React.InputHTMLAttributes<HTMLInputElement> & {
  type: 'text';
  name: Path<T>;
  register?: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
};
type TextAreaProps<T extends FieldValues> = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  type: 'textarea';
  name: Path<T>;
  register?: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
};

const TextInput = <T extends FieldValues>(props: TextAreaProps<T> | TextInputProps<T>) => {
  if (props.type === 'text') {
    const { className, register, registerOptions, ...inputAttrs } = props;
    return (
      <>
        {register ? (
          <input
            {...inputAttrs}
            {...register(inputAttrs.name, registerOptions)}
            className={` p-1 rounded-md border border-borderlightgray ${className || ''}`}
          />
        ) : (
          <input
            {...inputAttrs}
            className={` p-1 rounded-md border border-borderlightgray ${className || ''}`}
          />
        )}
      </>
    );
  }
  if (props.type === 'textarea') {
    const { className, register, registerOptions, ...textareaAttrs } = props;
    return (
      <>
        {register ? (
          <textarea
            {...textareaAttrs}
            {...register(textareaAttrs.name, registerOptions)}
            className={` resize-none  p-1 rounded-md border border-borderlightgray ${className || ''}`}
          />
        ) : (
          <textarea
            {...textareaAttrs}
            className={` resize-none  p-1 rounded-md border border-borderlightgray ${className || ''}`}
          ></textarea>
        )}
      </>
    );
  }
};

export default TextInput;
