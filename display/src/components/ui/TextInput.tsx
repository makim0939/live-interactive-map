import React from 'react';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & { type: 'text' };
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { type: 'textarea' };
const TextInput = (props: TextAreaProps | TextInputProps) => {
  if (props.type === 'text') {
    const { className, ...inputAttrs } = props;
    return (
      <input
        {...inputAttrs}
        className={` p-1 rounded-md border border-borderlightgray ${className || ''}`}
      />
    );
  }
  if (props.type === 'textarea') {
    const { className, ...textareaAttrs } = props;
    return (
      <textarea
        {...textareaAttrs}
        className={` resize-none  p-1 rounded-md border border-borderlightgray ${className || ''}`}
      ></textarea>
    );
  }
};

export default TextInput;
