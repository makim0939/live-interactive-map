import React from 'react';

type TextInputProps = {
  name: string;
  id: string;
  type: string;
  className?: string;
  row?: number;
  col?: number;
};
const TextInput = (props: TextInputProps) => {
  return (
    <>
      {props.type === 'text' && (
        <input
          name={props.name}
          id={props.id}
          type="text"
          className={` p-1 rounded-md border border-borderlightgray ${props.className || ''}`}
        />
      )}
      {props.type === 'textarea' && (
        <textarea
          name={props.name}
          id={props.id}
          className={` resize-none  p-1 rounded-md border border-borderlightgray ${props.className || ''}`}
          rows={props.row || 3}
          cols={props.col || 33}
        ></textarea>
      )}
    </>
  );
};

export default TextInput;
